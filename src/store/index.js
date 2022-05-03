import { configureStore } from '@reduxjs/toolkit'
import QuestionsReducer, { QUESTIONS_FEATURE_KEY } from '@/store/questions.slice.js'

export default configureStore({
    reducer:{
        [QUESTIONS_FEATURE_KEY]: QuestionsReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
})