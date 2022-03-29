import React from 'react'
import { MatchChampions } from '../../../../../../core/model'
import { getKdaColor, getKda, getWinRate } from '../../../../../../core/util'

import emptyMostChampIcon from '../../../../../../assets/icons/ic-no-most.png'

interface props {
  data: MatchChampions | undefined | null
}

const MostChampWrapper = ({data}: props) => {
  return (
      data ?
      <div className='champ-item'>
        <div className='icon-wrapper'>
          <img src={data.imageUrl} />
        </div>
        <div className='info-wrapper'>
          <div className='name'>{ data.name }</div>
          <div className='kda-win-rate'>
            <span className={`win-rate ${parseInt(String(getWinRate(data.wins, data.losses) * 100)) >= 60 ? 'good' : ''}`}>
              {`${parseInt(String(getWinRate(data.wins, data.losses) * 100))}`}
            </span>
            <span className={`win-rate-unit ${parseInt(String(getWinRate(data.wins, data.losses) * 100)) >= 60 ? 'good' : ''}`}>
              {'%'}
            </span>
            <span className='win-lose'>
              {`(${data.wins}승 ${data.losses}패)`}
            </span>
            <span className='divider-line'>{'|'}</span>
            <span className={`kda ${getKdaColor(getKda(data.kills, data.deaths , data.assists))}`}>
              {`${getKda(data.kills, data.deaths , data.assists).toFixed(2)} 평점`}
            </span>
          </div>
        </div> 
      </div> :
      <div className='champ-item'>
        <div className='icon-wrapper'>
          <img src={emptyMostChampIcon} />
        </div>
        <div className='empty-text'>
          { '챔피언 정보가 없습니다.' }
        </div>
      </div>
  )

}

export default MostChampWrapper