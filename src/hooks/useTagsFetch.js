import { useEffect, useState } from 'react'
import { message } from 'antd';
import request from '@/utils/request'

// import { tagRes as res } from '@/data/index'

export default function useTagsFetch(setQuery) {
    const [tags, setTags] = useState([])
    const [chosenTag, setchosenTag] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const params ={
                pagesize:10,
                site:'stackoverflow',
                order:'desc',
                sort:'popular',
            }
            const url = '/tags'
            const method = 'get'
            const option = { url, method, params }
            const res = await request(option).catch(err => console.log(err))            
            if (!res) return message.error('Cannot fetch data from server');

            const tagsArr = res.items.map(item => item.name)
            const firstTag = tagsArr[0]
            setTags(tagsArr)
            setQuery(firstTag)
            setchosenTag(firstTag)            
        }
        fetchData()
    }, [])

    return { tags, chosenTag, setchosenTag }
}