import React from 'react'
import { League } from '../../../../core/model'

import unRankedIcon from '../../../../assets/icons/ic-unranked.png'
import './RankInfoWrapper.styl'

interface props {
  soloRankData: League | undefined
  freeRankData: League | undefined
}

const RankInfoWrapper = ({ soloRankData, freeRankData }: props) => {
  return (
    <>
      <div className={`section-item solo-rank-wrapper ${(soloRankData && soloRankData.hasResults) ? '' : 'unranked'}`}>
        {
          (soloRankData && soloRankData.hasResults) ?
          <>
            <div className='icon-wrapper'>
              <img src={soloRankData.tierRank.imageUrl} />
            </div>
            <div className='info-wrapper'>
              <div className='title'>{'솔로 랭크'}</div>
              <div className='position-wrapper'>
                <span className='bold'>{ soloRankData.tierRank.division }</span>
                {` (총 ${ soloRankData.losses + soloRankData.wins }게임)`}
              </div>
              <div className='tier-wrapper'>{ soloRankData.tierRank.tier + ' ' + soloRankData.tierRank.shortString.substr(-1) }</div>
              <div className='lp-wrapper'>
                <span className='bold'>{ `${soloRankData.tierRank.lp} LP `}</span>
                { `/ ${soloRankData.wins}승 ${soloRankData.losses}패` }
              </div>
              <div className='lp-wrapper'>
                { `승률 ${parseInt(String(soloRankData.wins / (soloRankData.losses + soloRankData.wins) * 100))}%` }
              </div>
            </div>
          </> :
          <>
            <div className='icon-wrapper unranked'>
              <img src={unRankedIcon} />
            </div>
            <div className='info-wrapper'>
              <div className='title'>{'솔로 랭크'}</div>
              <div className='unranked-text'>{'Unranked'}</div>
            </div>
          </>
        }
      </div>
      <div className={`section-item free-rank-wrapper ${(freeRankData && freeRankData.hasResults) ? '' : 'unranked'}`}>
        {
          (freeRankData && freeRankData.hasResults) ?
          <>
            <div className='icon-wrapper'>
              <img src={freeRankData.tierRank.imageUrl} />
            </div>
            <div className='info-wrapper'>
              <div className='title'>{'자유 5:5 랭크'}</div>
              <div className='position-wrapper'>
                <span className='bold'>{ freeRankData.tierRank.division }</span>
                {` (총 ${ freeRankData.losses + freeRankData.wins }게임)`}
              </div>
              <div className='tier-wrapper'>{ freeRankData.tierRank.tier + ' ' + freeRankData.tierRank.shortString.substr(-1) }</div>
              <div className='lp-wrapper'>
                <span className='bold'>{ `${freeRankData.tierRank.lp} LP `}</span>
                { `/ ${freeRankData.wins}승 ${freeRankData.losses}패` }
              </div>
              <div className='lp-wrapper'>
                { `승률 ${parseInt(String(freeRankData.wins / (freeRankData.losses + freeRankData.wins) * 100))}%` }
              </div>
            </div>
          </> :
          <>
            <div className='icon-wrapper unranked'>
              <img src={unRankedIcon} />
            </div>
            <div className='info-wrapper'>
              <div className='title'>{'자유 5:5 랭크'}</div>
              <div className='unranked-text'>{'Unranked'}</div>
            </div>
          </>
        }
      </div>
    </>
  )
}

export default RankInfoWrapper