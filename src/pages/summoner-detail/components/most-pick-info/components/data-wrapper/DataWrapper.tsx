import React from 'react'
import { MatchData } from '../../../../../../core/model'
import { getKdaColor, getKda, getWinRate } from '../../../../../../core/util'

import emptyMostChampIcon from '../../../../../../assets/icons/ic-no-most.png'
import mostPositionTop from '../../../../../../assets/icons/ic-most-position-top.png'
import mostPositionMid from '../../../../../../assets/icons/ic-most-position-mid.png'
import mostPositionJungle from '../../../../../../assets/icons/ic-most-position-jungle.png'
import mostPositionAdc from '../../../../../../assets/icons/ic-most-position-adc.png'
import mostPositionSup from '../../../../../../assets/icons/ic-most-position-sup.png'
import MostChampWrapper from '../most-champ-wrapper/MostChampWrapper'

interface props {
  data: MatchData
  type: string
  totalGames: number
}

const DataWrapper = ({data, type, totalGames}: props) => {

  const getMostPositionImage = (position: string) => {
    const positionName = position.toLowerCase()
    if (positionName === 'top') return mostPositionTop
    else if (positionName === 'mid') return mostPositionMid
    else if (positionName === 'adc') return mostPositionAdc
    else if (positionName === 'sup') return mostPositionSup
    else if (positionName === 'jng') return mostPositionJungle
  }

  const getMostPositionName = (position: string) => {
    const positionName = position.toLowerCase()
    if (positionName === 'top') return '탑'
    else if (positionName === 'mid') return '미드'
    else if (positionName === 'adc') return '원딜'
    else if (positionName === 'sup') return '서포터'
    else if (positionName === 'jng') return '정글'
  }

  const MostChampionComponents = () => {
    const componentsArr = []
    for (let i = 0; i < 3; ++i) {
      componentsArr.push(<MostChampWrapper data={data.champions[i]} key={`most-pick-champ-item-${type}-${i}`}/>)
    }
    return componentsArr
  }

  const getPickRate = (position: number, total: number) => {
    if (position <= 0) return 0
    return position / total
  }

  return (
    <>
      <div className='summary-wrapper section'>
        <div className='game-count'>{`${(data.summary.wins + data.summary.losses)}전 ${data.summary.wins}승 ${data.summary.losses}패`}</div>
        <div className='chart-wrapper'>
          <div className='chart' style={{ 
            background: `conic-gradient(#1f8ecd ${parseInt(String(getWinRate(data.summary.wins, data.summary.losses) * 100))}%, #ee5a52 ${parseInt(String(data.summary.wins / (data.summary.wins + data.summary.losses) * 100))}%)`
          }}>
            <span className='center'>{`${parseInt(String(getWinRate(data.summary.wins, data.summary.losses) * 100))}%`}</span>
          </div>
          <div className='number-wrapper'>
            <div className='number-format'>
              <span className='kill'>{ data.summary.kills }</span>
              <span className='slash'>{ ' / ' }</span>
              <span className='death'>{ data.summary.deaths }</span>
              <span className='slash'>{ ' / ' }</span>
              <span className='assist'>{ data.summary.assists }</span>
            </div>
            <div className='kda-wrapper number-format'>
              <span className={`kda ${getKdaColor(getKda(data.summary.kills, data.summary.deaths, data.summary.assists))}`}>{
                getKda(data.summary.kills, data.summary.deaths, data.summary.assists).toFixed(2)
              }</span>
              <span className={`kda-unit ${getKdaColor(getKda(data.summary.kills, data.summary.deaths, data.summary.assists))}`}>{ ':1' }</span>
              <span className={`win-rate ${parseInt(String(getWinRate(data.summary.wins, data.summary.losses) * 100)) >= 60 ? 'good' : '' }`}>{
                `(${parseInt(String(getWinRate(data.summary.wins, data.summary.losses) * 100))}%)`
              }</span>
            </div>
          </div>
        </div>
      </div>
      <div className='most-champ-wrapper section'>
        {
          MostChampionComponents()
        }
      </div>
      <div className='position-wrapper section'>
        <div className='section-title'>{ '선호 포지션 (랭크)' }</div>
        {
          data.positions.map(position => {
            return (
              <div className='position-item' key={`position-item-${position.positionName}-${position.games}`}>
                <div className='icon-wrapper'>
                  <img src={getMostPositionImage(position.position)} />
                </div>
                <div className='info-wrapper'>
                  <div className='name'>{ getMostPositionName(position.position) }</div>
                  <div className='pick-rate-wrapper'>
                    <span className='pick-rate'>{ parseInt(String(getPickRate(position.games, totalGames) * 100)) }</span>
                    <span className='pick-rate-unit'>{'%'}</span>
                    <span className='divider-line'>{'|'}</span>
                    <span className='win-rate-unit'>{'승률'}</span>
                    <span className='win-rate'>{ parseInt(String(getWinRate(position.wins, position.losses) * 100)) }</span>
                    <span className='win-rate-unit'>{'%'}</span>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )

}

export default DataWrapper