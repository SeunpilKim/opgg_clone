import React from 'react'
import { Summoner } from '../../core/model'
import BasicUserInfo from './components/basic-user-info/BasicUserInfo'
import DetailUserInfo from './components/detail-user-info/DetailUserInfo'

import './SummonerDetail.styl'

interface detailProps {
  data: Summoner | null
}

const SummonerDetail = ({data} : detailProps) => {
  return (
    <div className='contents-wrapper'>
      {
        data ?
        <>
          <BasicUserInfo data={data}/>
          <DetailUserInfo data={data}/>
        </> :
        <>
          <div className='empty-text'>
            {'소환사를 검색/선택 하세요.'}
          </div>
        </>
      }
    </div>
  )
}

export default SummonerDetail