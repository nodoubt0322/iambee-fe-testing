
import avatar from '@/assets/avatar.png'

export default function Questions ({ questionsArr, questionRef }){
    return questionsArr.map((item,index) => {
        const { 
            title, 
            answer_count, 
            score, 
            view_count, 
            link, 
            display_name, 
            profile_image} = item
            
        return (
            <div ref={ questionRef(index) } key={index} className="h-41">
                <a className="block" href={link} target="_blank">{title}</a>
                <div className='flex items-center justify-around border-b-2 text-center'>
                    <div>
                        <div className='text-red-600'>Score</div>
                        <div>{score}</div>
                    </div>
                    <div>
                        <div className='text-red-600'>Answers</div>
                        <div>{answer_count}</div>
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