import React, { useState } from 'react'
import { MostChampion, RecentChampion } from '../../../../core/model'

import './WinRatesInfo.styl'

interface props {
  mostChampions: MostChampion[]
  recentChampions: RecentChampion[]
}

const WinRatesInfo = ({ mostChampions, recentChampions }: props) => {
  const [activeTab, setActiveTab] = useState<'champion' | 'recent'>('champion')

  const getKdaColor = (kda: number) => {
    if (kda >= 3 && kda < 4) {
      return 'normal'
    } else if (kda >= 4 && kda < 5) {
      return 'good'
    } else if (kda >= 5) {
      return 'excellent'
    } else {
      return ''
    }
  }

  return (
    <div className='champions-list-wrapper'>
      <div className='nav-wrapper'>
        <div className={`nav-item ${activeTab === 'champion' ? 'active' : ''}`} onClick={() => { setActiveTab('champion') }}>
          { '챔피언 승률' }
        </div>
        <div className={`nav-item ${activeTab === 'recent' ? 'active' : ''}`} onClick={() => { setActiveTab('recent') }}>
          { '7일간 랭크 승률' }
        </div>
      </div>
      {
        activeTab === 'champion' ?
        <div className='list-wrapper'>
          {
            mostChampions.map((champ, index) => {
              const kda = (champ.kills + champ.assists) / champ.deaths
              const winRate = champ.wins / (champ.wins + champ.losses) * 100

              return (
                <div className='champ-item' key={`most-champion-key-${champ.id}-${index}`}>
                  <div className='icon-wrapper'>
                    <img src={champ.imageUrl} />
                  </div>
                  <div className='info-wrapper'>
                    <div className='first-line'>
                      <span className='name'>{ `${champ.name}` }</span>
                      <span className={`kda ${getKdaColor(kda)}`}>{ `${kda.toFixed(2)}:1 평점` }</span>
                      <span className={`win-rate ${winRate >= 60 ? 'good' : ''}`}>{ `${parseInt(String(winRate))}%` }</span>
                    </div>
                    <div className='second-line'>
                      <span className='cs'>{ `CS ${champ.cs}` }</span>
                      <span className='kda-detail'>{ `${champ.kills} / ${champ.deaths} / ${champ.assists}` }</span>
                      <span className='game-count'>{ `${champ.games}게임` }</span>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        :
        <div className='list-wrapper'>
          {
            recentChampions.map((champ, index) => {
              const winRate = champ.wins / (champ.wins + champ.losses) * 100
              return (
                <div className='recent champ-item' key={`recent-champion-key-${champ.id}-${index}`}>
                  <div className='recent-icon-wrapper'>
                    <img src={champ.imageUrl} />
                  </div>
                  <div className='recent-info-wrapper'>
                    <span className='recent-name'>{ `${champ.name}` }</span>
                    <span className={`recent-win-rate`}>{ `${parseInt(String(winRate))}%` }</span>
                    <div className='recent-win-rate-bar'>
                      <div className='win' style={{ width: `${winRate}%` }}>{`${champ.wins}승`}</div>
                      <div className='lose'style={{ width: `calc(100% - ${winRate}%` }} >{`${champ.losses}패`}</div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      }
    </div>
  )
}

export default WinRatesInfo