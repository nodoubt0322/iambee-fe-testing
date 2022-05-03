import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import request from '@/utils/request'

const questionsAdapter = createEntityAdapter({
    selectId: item => item.question_id,
})
const { selectAll } = questionsAdapter.getSelectors()
export const QUESTIONS_FEATURE_KEY = 'questions'

export const selectQuestions = createSelector(
    state=> state[QUESTIONS_FEATURE_KEY], 
    selectAll
)

export const loadQuestions = createAsyncThunk(
    'questions/loadQuestions', 
    (payload) => {
        const { tagged, page } = payload
        const params ={
            pagesize:20,
            site:'stackoverflow',
            order:'desc',
            sort:'activity',
            tagged,
            page,
        }
        const url = '/questions'
        const method = 'get'
        const option = { url, method, params }
        
        return request(option).then(res => {
            const contentArr = res.items.map(item => {
                const { is_answered, answer_count, score, view_count, question_id, link, owner, title,  } = item
                const { display_name, profile_image} = owner
                const content = { title, is_answered, answer_count, score, view_count, question_id, link, display_name, profile_image }
            
                return content
            })
            return contentArr            
        })
})

const { reducer: QuestionsReducer , actions } = createSlice({
    name: QUESTIONS_FEATURE_KEY,
    initialState: questionsAdapter.getInitialState(),
    reducers: {
        addQuestions:{
            reducer:questionsAdapter.addOne
        },
        setQuestions:{
            reducer:questionsAdapter.setAll
        }
    },
    extraReducers: {
        [loadQuestions.fulfilled]: questionsAdapter.setAll
    }
})

export const { addQuestions, setQuestions } = actions
export default QuestionsReducer