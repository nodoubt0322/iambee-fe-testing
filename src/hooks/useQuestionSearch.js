import { useEffect, useState } from 'react'
import { message } from 'antd';
import axios from 'axios'
import { debounce } from '@/utils'

import { searchRes as res } from '@/data/index'

export default function useQuestionSearch(query, page) {
    const [loading, setLoading] = useState(true)
    const [questionsArr, setQuestionsArr] = useState([])
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        setQuestionsArr([])
    }, [query])

    useEffect(() => {
        const fetchData = async () => {
            console.log('fetch search', query)
            // if (!query) return;
            // const params ={
            //     pagesize:20,
            //     site:'stackoverflow',
            //     order:'desc',
            //     sort:'activity',
            //     tagged:query,
            //     page,
            // }
            // const url = 'https://api.stackexchange.com/2.3/questions'
            // const method = 'get'
            // const option = { url, method, params }

            // setLoading(true)
            // const res = await axios(option).catch(err => console.log(err))
            setLoading(false)
            
            if (!res) return message.error('Cannot fetch data from server');
        
            if (res.data.quota_remaining === 0) setHasMore(false)

            const contentArr = res.data.items.map(item => {
                const { answer_count, score, view_count, link, owner, title } = item
                const { display_name, profile_image} = owner
                const content = { title, answer_count, score, view_count, link, display_name, profile_image }
            
                return content
            })
            setQuestionsArr(pre => [...pre, ...contentArr])
        }
        fetchData()
    }, [query, page])

    return { loading, questionsArr, hasMore }
}