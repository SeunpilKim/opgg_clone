import React, { useEffect, useState } from 'react'
import { MatchData } from '../../../../core/model'

import './MostPickInfo.styl'
import DataWrapper from './components/data-wrapper/DataWrapper'

interface props {
  totalData: MatchData | null
  soloData: MatchData | null
  freeData: MatchData | null
  handleChangeTab: (nav: 'total' | 'solo' | 'free') => void
}

const MostPickInfo = ({totalData, soloData, freeData, handleChangeTab}: props) => {
  const [activeNav, setActiveNav] = useState<'total' | 'solo' | 'free'>('total')

  useEffect(() => {
    handleChangeTab(activeNav)
  }, [activeNav])

  return <div className='most-pick-wrapper'>
    <div className='nav-bar'>
      <div className={`nav-item ${activeNav === 'total' ? 'active' : ''}`} onClick={() => { setActiveNav('total') }} > {'전체'} </div>
      <div className={`nav-item ${activeNav === 'solo' ? 'active' : ''}`} onClick={() => { setActiveNav('solo') }} > {'솔로게임'} </div>
      <div className={`nav-item ${activeNav === 'free' ? 'active' : ''}`} onClick={() => { setActiveNav('free') }} > {'자유랭크'} </div>
    </div>
    <div className='most-pick-detail'>
      {
        activeNav === 'total' &&
        (
          totalData ?
          <DataWrapper data={totalData} type={'total'} />:
          <div className='empty-data'>
            {'정보가 없습니다.'}
          </div>
        )
      }
      {
        activeNav === 'solo' &&
        (
          soloData ?
          <DataWrapper data={soloData} type={'solo'} /> :
          <div className='empty-data'>
            {'정보가 없습니다.'}
          </div>
        )
      }
      {
        activeNav === 'free' &&
        (
          freeData ?
          <DataWrapper data={freeData} type={'free'} />  :
          <div className='empty-data'>
            {'정보가 없습니다.'}
          </div>
        )
      }
    </div>
  </div>

}

export default MostPickInfo