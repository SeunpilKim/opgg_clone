import React from 'react'
import { Summoner } from '../../../../core/model'

import './BasicUserInfo.styl'

interface basicProps {
  data: Summoner
}

const BasicUserInfo = ({ data }: basicProps) => {
  const { ladderRank, level, name, previousTiers, profileBackgroundImageUrl, profileBorderImageUrl, profileImageUrl } = data

  return (
    <div className='top-wrapper'>
      {
        previousTiers.length !== 0 &&
        <div className='previous-tiers-wrapper'>
          {
            previousTiers.map((tier, index) => {
              return (
                <div className='tier-item' key={`tier-item-${name}-${index}`}>
                  <span className='season'>{`S${tier.season}`}</span>
                  { tier.tier }
                </div>
              )
            })
          }
        </div>
      }
      <div className='info-wrapper'>
        <div className='image-wrapper'>
          <img src={profileImageUrl} />
          <div className='border-image-wrapper'>
            <img src={profileBorderImageUrl} />
          </div>
          <span className='level-wrapper'>
            { level }
          </span>
        </div>
        <div className='name-wrapper'>
          <div className='name'>{ name }</div>
          {
            ladderRank &&
            <>
              <span className='rank-text'>{`래더 랭킹 `}</span>
              <span className='rank-text strong'>{`${ladderRank.rank.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`}</span>
              <span className='rank-text'>{`위 (상위 ${ladderRank.rankPercentOfTop}%)`}</span>
            </>

          }
        </div>
      </div>
    </div>
  )
}

export default BasicUserInfo