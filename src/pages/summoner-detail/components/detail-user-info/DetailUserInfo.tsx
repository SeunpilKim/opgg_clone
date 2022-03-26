import React from 'react'
import { Summoner } from '../../../../core/model'
import RankInfoWrapper from '../rank-info-wrapper/RankInfoWrapper'

import './DetailUserInfo.styl'

interface detailProps {
  data: Summoner
}

const DetailUserInfo = ({ data }: detailProps) => {
  const { leagues } = data
  const soloRankData = leagues.find(league => league.tierRank.name === '솔랭');
  const freeRankData = leagues.find(league => league.tierRank.name === '자유 5:5 랭크');

  return (
    <div className='middle-wrapper'>
      <div className='left-section'>
        <RankInfoWrapper 
          soloRankData={soloRankData}
          freeRankData={freeRankData}
        />
      </div>
      <div className='right-section'>

      </div>
    </div>
  )
}

export default DetailUserInfo