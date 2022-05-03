// 1.自定義hook拆分
// 2.useAsync
// 3.useScroll
// errorBoundary
// 


import React, { useEffect, useCallback, useRef } from 'react'
import { Input } from 'antd';
const { Search } = Input;
import { Tag, Divider } from 'antd';
import tagsFetch from '@/hooks/useTagsFetch';
import questionSearch from '@/hooks/useQuestionSearch.js'
import { Spin, Alert } from 'antd';
import TagGroup from '@/components/TagGroup'
import Questions from '@/components/Questions'
import { debounce } from './utils';


let aaa = ''


function App() {
  const [query, setQuery] = React.useState('')
  const [page, setPage] = React.useState(1)

  const { tags, chosenTag, setchosenTag } = tagsFetch(setQuery)
  const { loading, questionsArr, hasMore } = questionSearch(query, page)

  const searchRef = useRef()

  // handle inifinite scroll
  const observer = useRef()
  const lastQuestionRef = useCallback(node => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      // if (entries[0].isIntersecting && hasMore ) setPage(page => page + 1) 
      if (entries[0].isIntersecting && hasMore ) console.log('intersection')
    })
    if (node) observer.current.observe(node)
  },[])

  // add ref to last question
  const questionRef = index => (questionsArr.length === index + 1) ? lastQuestionRef: null
  
  // components
  function handleChooseTag(item){
    setchosenTag(item)
    setQuery(item)
    setPage(1)
  }

  // const tagGroup = tags.map((item,index) => <Tag onClick={() => handleChooseTag(item)} className={`rounded-lg ${ (chosenTag === item) && 'bg-yellow-400'}  `} key={index}>{item}</Tag>)

  // #region questionGroup
  // const questionGroup = questionsArr.map((item,index) => {
  //   const { title, answer_count, score, view_count, link, display_name, profile_image} = item
  //   return (
  //     <div ref={ questionRef(index) }  key={index} className="h-41">
  //       <a className="block" href={link} target="_blank">{title}</a>
  //       <div className='flex items-center justify-around border-b-2 text-center'>
  //         <div>
  //           <div className='text-red-600'>Score</div>
  //           <div>{score}</div>
  //         </div>
  //         <div>
  //           <div className='text-red-600'>Answers</div>
  //           <div>{answer_count}</div>
  //         </div>
  //         <div>
  //           <div className='text-red-600'>Viewed</div>
  //           <div>{view_count}</div>
  //         </div>
  //         <div className='w-30 justify-self-end'>
  //           <div>
  //             <img 
  //               className='w-full rounded-full' 
  //               src={profile_image} 
  //               onError={ ({currentTarget}) => {
  //                 currentTarget.onerror = null;
  //                 currentTarget.src = avatar
  //               }}/>
  //           </div>
  //           <div>{display_name}</div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // })


  function handleSearch(e){
    setQuery(e.target.value)
  }

  return (
    <div className='container mx-auto'>
      <header className="py-10 sticky top-0">
        <Search 
          ref ={ searchRef }
          placeholder="Tag" 
          allowClear 
          enterButton="Search" 
          size="large"
          onChange={ debounce(handleSearch) }
        />
        <Divider orientation="left">Trending</Divider>
        <TagGroup tags={tags} chosenTag={chosenTag} handleChooseTag={handleChooseTag}  />
        {/* <div> { tagGroup }</div> */}
      </header>

      <section>
        {/* { questionGroup } */}
        <Questions questionsArr={questionsArr} questionRef={questionRef} />
        { loading&&
          <Spin tip="Loading..." size="large">
            <Alert message="fetching data" description="Please wait" type="info" />
          </Spin>          
        }
      </section>
    </div>
  )
}

export default App