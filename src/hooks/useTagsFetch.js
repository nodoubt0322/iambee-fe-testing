import { useEffect, useState } from 'react'
import { message } from 'antd';
import axios from 'axios'

import { tagRes as res } from '@/data/index'

export default function useTagsFetch(setQuery) {
    const [tags, setTags] = useState([])
    const [chosenTag, setchosenTag] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            console.log('fetched tag')
            // const params ={
            //     pagesize:10,
            //     site:'stackoverflow',
            //     order:'desc',
            //     sort:'popular',
            // }
            // const url = 'https://api.stackexchange.com/2.3/tags'
            // const method = 'get'
            // const option = { url, method, params }
            // const res = await axios(option).catch(err => console.log(err))            
            if (!res) return message.error('Cannot fetch data from server');

            const tagsArr = res.data.items.map(item => item.name)
            setTags(tagsArr)
            setQuery(tagsArr[0])
            setchosenTag(tagsArr[0])            
        }
        fetchData()
    }, [])

    return { tags, chosenTag, setchosenTag }
}