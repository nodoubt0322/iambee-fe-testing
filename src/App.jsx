import { useState } from 'react'
import { Input, Divider, Spin, Alert, BackTop } from 'antd';
import { UpCircleTwoTone } from '@ant-design/icons';
import TagGroup from '@/components/TagGroup'
import Questions from '@/components/Questions'
import useTagsFetch from '@/hooks/useTagsFetch';
import useQuestionSearch from '@/hooks/useQuestionSearch.js'
import { debounce } from './utils';
const { Search } = Input;
const { ErrorBoundary } = Alert;



function App() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const { tags, chosenTag, setchosenTag } = useTagsFetch(setQuery)
  const { loading, questionsArr, hasMore } = useQuestionSearch(query, page)

  function handleChooseTag(item){
    setchosenTag(item)
    setQuery(item)
    setPage(1)
  }

  function handleSearch(e){
    setQuery(e.target.value)
    setchosenTag(e.target.value)
  }

  return (
    <div className='container mx-auto px-4'>
      <header className="py-10 sticky top-0 bg-white">
        <Search 
          placeholder="Tag" 
          allowClear 
          enterButton="Search" 
          size="large"
          onChange={ debounce(handleSearch) }
        />
        <Divider orientation="left">Trending</Divider>
        <ErrorBoundary description="" message="Server is busy, Please try again later." >
          <TagGroup tags={tags} chosenTag={chosenTag} handleChooseTag={handleChooseTag}  />
        </ErrorBoundary>
      </header>

      <section>
        <ErrorBoundary description="" message="Server is busy, Please try again later." >
          <Questions questionsArr={questionsArr} hasMore={hasMore} setPage={setPage} />
        </ErrorBoundary>
        <BackTop>
          <UpCircleTwoTone style={{ fontSize: '40px' }} />
        </BackTop>        
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