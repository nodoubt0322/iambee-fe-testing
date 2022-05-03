import { Tag } from 'antd';

export default function TagGroup ({ tags, handleChooseTag, chosenTag }){
    return (
        <div>
            {   
                tags.map((item,index) => { 
                    return (
                        <Tag 
                            onClick={() => handleChooseTag(item)} 
                            className={`rounded-lg ${ (chosenTag === item) && 'bg-yellow-400'}`}
                            key={index}
                        >
                            {item}
                        </Tag>
                    )
                })
            }
        </div>
    )
}