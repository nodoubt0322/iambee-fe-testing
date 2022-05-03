
import { useCallback, useRef } from 'react'
import avatar from '@/assets/avatar.png'

export default function Questions ({ questionsArr, hasMore, setPage }) {
    const observer = useRef()
    const lastQuestionRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore ) setPage(page => page + 1) 
        })
        if (node) observer.current.observe(node)
    },[])
    const questionRef = index => (questionsArr.length === index + 1) ? lastQuestionRef: null

    const scoreClassName = score => score < 0 ? 'text-red-700' : ''
    const answerClassName = (answer_count, is_answered) => {
        if (answer_count > 0 && is_answered) return 'border-green-600 bg-green-600 text-white'
        if (answer_count > 0 && !is_answered) return 'border border-green-600 text-green-600'
        return ''
    } 

    return questionsArr.map((item,index) => {
        const { 
            title, 
            answer_count,
            is_answered,
            score, 
            view_count, 
            link, 
            display_name, 
            profile_image} = item
            
        return (
            <div ref={ questionRef(index) } key={index} className="min-h-41">
                <a className="block" href={link} target="_blank">{title}</a>
                <div className='flex items-center justify-around border-b-2 text-center'>
                    <div>
                        <div className='text-red-600'>Score</div>
                        <div className={scoreClassName(score)}>{score}</div>
                    </div>
                    <div>
                        <div className='text-red-600'>Answers</div>
                        <div className={answerClassName(answer_count, is_answered)}>{answer_count}</div>
                    </div>
                    <div>
                        <div className='text-red-600'>Viewed</div>
                        <div>{view_count}</div>
                    </div>
                    <div className='w-30 justify-self-end'>
                        <div>
                            <img 
                                className='w-full rounded-full' 
                                src={profile_image} 
                                onError={ ({currentTarget}) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = avatar
                                }}
                            />
                        </div>
                        <div>{display_name}</div>
                    </div>
                </div>
            </div>
        )
    })
}