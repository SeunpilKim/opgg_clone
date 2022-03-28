import React, { useEffect, useState } from 'react'
import { MatchData } from '../../../../core/model'

import './MostPickInfo.styl'
import emptyMostChampIcon from '../../../../assets/icons/ic-no-most.png'
import mostPositionTop from '../../../../assets/icons/ic-most-position-top.png'
import mostPositionMid from '../../../../assets/icons/ic-most-position-mid.png'
import mostPositionJungle from '../../../../assets/icons/ic-most-position-jungle.png'
import mostPositionAdc from '../../../../assets/icons/ic-most-position-adc.png'
import mostPositionSup from '../../../../assets/icons/ic-most-position-sup.png'

interface props {
  totalData: MatchData | null
  soloData: MatchData | null
  freeData: MatchData | null
  handleChangeTab: (nav: 'total' | 'solo' | 'free') => void
}

const MostPickInfo = ({totalData, soloData, freeData, handleChangeTab}: props) => {
  const [activeNav, setActiveNav] = useState<'total' | 'solo' | 'free'>('total')

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

  const getWinRate = (win: number, lose: number) => {
    if (win <= 0) {
      return 0
    } else {
      return win / (win + lose)
    }
  }

  const getKda = (kill: number, death: number, assist: number) => {
    if (death <= 0) {
      return kill + assist
    } else {
      return (kill + assist) / death
    }
  }

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
          <>
            <div className='summary-wrapper section'>
              <div className='game-count'>{`${(totalData.summary.wins + totalData.summary.losses)}전 ${totalData.summary.wins}승 ${totalData.summary.losses}패`}</div>
              <div className='chart-wrapper'>
                <div className='chart' style={{ 
                  background: `conic-gradient(#1f8ecd ${parseInt(String(getWinRate(totalData.summary.wins, totalData.summary.losses) * 100))}%, #ee5a52 ${parseInt(String(totalData.summary.wins / (totalData.summary.wins + totalData.summary.losses) * 100))}%)`
                }}>
                  <span className='center'>{`${parseInt(String(getWinRate(totalData.summary.wins, totalData.summary.losses) * 100))}%`}</span>
                </div>
                <div className='number-wrapper'>
                  <div className='number-format'>
                    <span className='kill'>{ totalData.summary.kills }</span>
                    <span className='slash'>{ ' / ' }</span>
                    <span className='death'>{ totalData.summary.deaths }</span>
                    <span className='slash'>{ ' / ' }</span>
                    <span className='assist'>{ totalData.summary.assists }</span>
                  </div>
                  <div className='kda-wrapper number-format'>
                    <span className={`kda ${getKdaColor(getKda(totalData.summary.kills, totalData.summary.deaths, totalData.summary.assists))}`}>{
                      getKda(totalData.summary.kills, totalData.summary.deaths, totalData.summary.assists).toFixed(2)
                    }</span>
                    <span className={`kda-unit ${getKdaColor(getKda(totalData.summary.kills, totalData.summary.deaths, totalData.summary.assists))}`}>{ ':1' }</span>
                    <span className={`win-rate ${parseInt(String(getWinRate(totalData.summary.wins, totalData.summary.losses) * 100)) >= 60 ? 'good' : '' }`}>{
                      `(${parseInt(String(getWinRate(totalData.summary.wins, totalData.summary.losses) * 100))}%)`
                    }</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='most-champ-wrapper section'>
              {
                totalData.champions[0] ?
                <div className='champ-item'>
                  <div className='icon-wrapper'>
                    <img src={totalData.champions[0].imageUrl} />
                  </div>
                  <div className='info-wrapper'>
                    <div className='name'>{ totalData.champions[0].name }</div>
                    <div className='kda-win-rate'>
                      <span className={`win-rate ${parseInt(String(getWinRate(totalData.champions[0].wins, totalData.champions[0].losses) * 100)) >= 60 ? 'good' : ''}`}>
                        {`${parseInt(String(getWinRate(totalData.champions[0].wins, totalData.champions[0].losses) * 100))}`}
                      </span>
                      <span className={`win-rate-unit ${parseInt(String(getWinRate(totalData.champions[0].wins, totalData.champions[0].losses) * 100)) >= 60 ? 'good' : ''}`}>
                        {'%'}
                      </span>
                      <span className='win-lose'>
                        {`(${totalData.champions[0].wins}승 ${totalData.champions[0].losses}패)`}
                      </span>
                      <span className='divider-line'>{'|'}</span>
                      <span className={`kda ${getKdaColor(getKda(totalData.champions[0].kills, totalData.champions[0].deaths , totalData.champions[0].assists))}`}>
                        {`${getKda(totalData.champions[0].kills, totalData.champions[0].deaths , totalData.champions[0].assists).toFixed(2)} 평점`}
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
              }
              {
                totalData.champions[1] ?
                <div className='champ-item'>
                  <div className='icon-wrapper'>
                    <img src={totalData.champions[1].imageUrl} />
                  </div>
                  <div className='info-wrapper'>
                    <div className='name'>{ totalData.champions[1].name }</div>
                    <div className='kda-win-rate'>
                      <span className={`win-rate ${parseInt(String(getWinRate(totalData.champions[1].wins, totalData.champions[1].losses) * 100)) >= 60 ? 'good' : ''}`}>
                        {`${parseInt(String(getWinRate(totalData.champions[1].wins, totalData.champions[1].losses) * 100))}`}
                      </span>
                      <span className={`win-rate-unit ${parseInt(String(getWinRate(totalData.champions[1].wins, totalData.champions[1].losses) * 100)) >= 60 ? 'good' : ''}`}>
                        {'%'}
                      </span>
                      <span className='win-lose'>
                        {`(${totalData.champions[1].wins}승 ${totalData.champions[1].losses}패)`}
                      </span>
                      <span className='divider-line'>{'|'}</span>
                      <span className={`kda ${getKdaColor(getKda(totalData.champions[1].kills, totalData.champions[1].deaths, totalData.champions[1].assists))}`}>
                        {`${(getKda(totalData.champions[1].kills, totalData.champions[1].deaths, totalData.champions[1].assists)).toFixed(2)} 평점`}
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
              }
              {
                totalData.champions[2] ?
                <div className='champ-item'>
                  <div className='icon-wrapper'>
                    <img src={totalData.champions[2].imageUrl} />
                  </div>
                  <div className='info-wrapper'>
                    <div className='name'>{ totalData.champions[2].name }</div>
                    <div className='kda-win-rate'>
                      <span className={`win-rate ${parseInt(String(getWinRate(totalData.champions[2].wins, totalData.champions[2].losses) * 100)) >= 60 ? 'good' : ''}`}>
                        {`${parseInt(String(getWinRate(totalData.champions[2].wins, totalData.champions[2].losses) * 100))}`}
                      </span>
                      <span className={`win-rate-unit ${parseInt(String(getWinRate(totalData.champions[2].wins, totalData.champions[2].losses) * 100)) >= 60 ? 'good' : ''}`}>
                        {'%'}
                      </span>
                      <span className='win-lose'>
                        {`(${totalData.champions[2].wins}승 ${totalData.champions[2].losses}패)`}
                      </span>
                      <span className='divider-line'>{'|'}</span>
                      <span className={`kda ${getKdaColor(getKda(totalData.champions[2].kills, totalData.champions[2].deaths, totalData.champions[2].assists))}`}>
                        {`${(getKda(totalData.champions[2].kills, totalData.champions[2].deaths, totalData.champions[2].assists)).toFixed(2)} 평점`}
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
              }
            </div>
            <div className='position-wrapper section'>
              <div className='section-title'>{ '선호 포지션 (랭크)' }</div>
              {
                totalData.positions.map(position => {
                  return (
                    <div className='position-item' key={`position-item-${position.positionName}-${position.games}`}>
                      <div className='icon-wrapper'>
                        <img src={getMostPositionImage(position.position)} />
                      </div>
                      <div className='info-wrapper'>
                        <div className='name'>{ getMostPositionName(position.position) }</div>
                        <div className='pick-rate-wrapper'>
                          <span className='pick-rate'>{ parseInt(String(position.games / totalData.games.length * 100)) }</span>
                          <span className='pick-rate-unit'>{'%'}</span>
                          <span className='divider-line'>{'|'}</span>
                          <span className='win-rate-unit'>{'승률'}</span>
                          <span className='win-rate'>{ parseInt(String(position.wins / position.games * 100)) }</span>
                          <span className='win-rate-unit'>{'%'}</span>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </> :
          <div className='empty-data'>
            {'정보가 없습니다.'}
          </div>
        )
      }
      {
        activeNav === 'solo' &&
        (
          soloData ?
          <>
            <div className='summary-wrapper section'>
              <div className='game-count'>{`${(soloData.summary.wins + soloData.summary.losses)}전 ${soloData.summary.wins}승 ${soloData.summary.losses}패`}</div>
              <div className='chart-wrapper'>
                <div className='chart' style={{ 
                  background: `conic-gradient(#1f8ecd ${parseInt(String(getWinRate(soloData.summary.wins, soloData.summary.losses) * 100))}%, #ee5a52 ${parseInt(String(getWinRate(soloData.summary.wins, soloData.summary.losses) * 100))}%)`
                }}>
                  <span className='center'>{`${parseInt(String(getWinRate(soloData.summary.wins, soloData.summary.losses) * 100))}%`}</span>
                </div>
                <div className='number-wrapper'>
                  <div className='number-format'>
                    <span className='kill'>{ soloData.summary.kills }</span>
                    <span className='slash'>{ ' / ' }</span>
                    <span className='death'>{ soloData.summary.deaths }</span>
                    <span className='slash'>{ ' / ' }</span>
                    <span className='assist'>{ soloData.summary.assists }</span>
                  </div>
                  <div className='kda-wrapper number-format'>
                    <span className={`kda ${getKdaColor(getKda(soloData.summary.kills, soloData.summary.deaths, soloData.summary.assists))}`}>{
                      (getKda(soloData.summary.kills, soloData.summary.deaths, soloData.summary.assists)).toFixed(2)
                    }</span>
                    <span className={`kda-unit ${getKdaColor(getKda(soloData.summary.kills, soloData.summary.deaths, soloData.summary.assists))}`}>{ ':1' }</span>
                    <span className={`win-rate ${parseInt(String(getWinRate(soloData.summary.wins, soloData.summary.losses) * 100)) >= 60 ? 'good' : '' }`}>{
                      `(${parseInt(String(getWinRate(soloData.summary.wins, soloData.summary.losses) * 100))}%)`
                    }</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='most-champ-wrapper section'>
              {
                soloData.champions[0] ?
                <div className='champ-item'>
                  <div className='icon-wrapper'>
                    <img src={soloData.champions[0].imageUrl} />
                  </div>
                  <div className='info-wrapper'>
                    <div className='name'>{ soloData.champions[0].name }</div>
                    <div className='kda-win-rate'>
                      <span className={`win-rate ${parseInt(String(getWinRate(soloData.champions[0].wins, soloData.champions[0].losses) * 100)) >= 60 ? 'good' : ''}`}>
                        {`${parseInt(String(getWinRate(soloData.champions[0].wins, soloData.champions[0].losses) * 100))}`}
                      </span>
                      <span className={`win-rate-unit ${parseInt(String(getWinRate(soloData.champions[0].wins, soloData.champions[0].losses) * 100)) >= 60 ? 'good' : ''}`}>
                        {'%'}
                      </span>
                      <span className='win-lose'>
                        {`(${soloData.champions[0].wins}승 ${soloData.champions[0].losses}패)`}
                      </span>
                      <span className='divider-line'>{'|'}</span>
                      <span className={`kda ${getKdaColor(getKda(soloData.champions[0].kills, soloData.champions[0].deaths, soloData.champions[0].assists))}`}>
                        {`${(getKda(soloData.champions[0].kills, soloData.champions[0].deaths, soloData.champions[0].assists)).toFixed(2)} 평점`}
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
              }
              {
                soloData.champions[1] ?
                <div className='champ-item'>
                  <div className='icon-wrapper'>
                    <img src={soloData.champions[1].imageUrl} />
                  </div>
                  <div className='info-wrapper'>
                    <div className='name'>{ soloData.champions[1].name }</div>
                    <div className='kda-win-rate'>
                      <span className={`win-rate ${parseInt(String(getWinRate(soloData.champions[1].wins, soloData.champions[1].losses) * 100)) >= 60 ? 'good' : ''}`}>
                        {`${parseInt(String(getWinRate(soloData.champions[1].wins, soloData.champions[1].losses) * 100))}`}
                      </span>
                      <span className={`win-rate-unit ${parseInt(String(getWinRate(soloData.champions[1].wins, soloData.champions[1].losses) * 100)) >= 60 ? 'good' : ''}`}>
                        {'%'}
                      </span>
                      <span className='win-lose'>
                        {`(${soloData.champions[1].wins}승 ${soloData.champions[1].losses}패)`}
                      </span>
                      <span className='divider-line'>{'|'}</span>
                      <span className={`kda ${getKdaColor(getKda(soloData.champions[1].kills, soloData.champions[1].deaths, soloData.champions[1].assists))}`}>
                        {`${(getKda(soloData.champions[1].kills, soloData.champions[1].deaths, soloData.champions[1].assists)).toFixed(2)} 평점`}
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
              }
              {
                soloData.champions[2] ?
                <div className='champ-item'>
                  <div className='icon-wrapper'>
                    <img src={soloData.champions[2].imageUrl} />
                  </div>
                  <div className='info-wrapper'>
                    <div className='name'>{ soloData.champions[2].name }</div>
                    <div className='kda-win-rate'>
                      <span className={`win-rate ${parseInt(String(getWinRate(soloData.champions[2].wins, soloData.champions[2].losses) * 100)) >= 60 ? 'good' : ''}`}>
                        {`${parseInt(String(getWinRate(soloData.champions[2].wins, soloData.champions[2].losses) * 100))}`}
                      </span>
                      <span className={`win-rate-unit ${parseInt(String(getWinRate(soloData.champions[2].wins, soloData.champions[2].losses) * 100)) >= 60 ? 'good' : ''}`}>
                        {'%'}
                      </span>
                      <span className='win-lose'>
                        {`(${soloData.champions[2].wins}승 ${soloData.champions[2].losses}패)`}
                      </span>
                      <span className='divider-line'>{'|'}</span>
                      <span className={`kda ${getKdaColor(getKda(soloData.champions[2].kills, soloData.champions[2].deaths, soloData.champions[2].losses))}`}>
                        {`${(getKda(soloData.champions[2].kills, soloData.champions[2].deaths, soloData.champions[2].losses)).toFixed(2)} 평점`}
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
              }
            </div>
            <div className='position-wrapper section'>
              <div className='section-title'>{ '선호 포지션 (랭크)' }</div>
              {
                soloData.positions.map(position => {
                  return (
                    <div className='position-item' key={`position-item-${position.positionName}-${position.games}`}>
                      <div className='icon-wrapper'>
                        <img src={getMostPositionImage(position.position)} />
                      </div>
                      <div className='info-wrapper'>
                        <div className='name'>{ getMostPositionName(position.position) }</div>
                        <div className='pick-rate-wrapper'>
                          <span className='pick-rate'>{ parseInt(String(position.games / (totalData ? totalData.games.length : 1) * 100)) }</span>
                          <span className='pick-rate-unit'>{'%'}</span>
                          <span className='divider-line'>{'|'}</span>
                          <span className='win-rate-unit'>{'승률'}</span>
                          <span className='win-rate'>{ parseInt(String(position.wins / position.games * 100)) }</span>
                          <span className='win-rate-unit'>{'%'}</span>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </> :
          <div className='empty-data'>
            {'정보가 없습니다.'}
          </div>
        )
      }
      {
        activeNav === 'free' &&
        (
          freeData ?
          <>
            <div className='summary-wrapper section'>
              <div className='game-count'>{`${(freeData.summary.wins + freeData.summary.losses)}전 ${freeData.summary.wins}승 ${freeData.summary.losses}패`}</div>
              <div className='chart-wrapper'>
                <div className='chart' style={{ 
                  background: `conic-gradient(#1f8ecd ${parseInt(String(getWinRate(freeData.summary.wins, freeData.summary.losses) * 100))}%, #ee5a52 ${parseInt(String(getWinRate(freeData.summary.wins, freeData.summary.losses) * 100))}%)`
                }}>
                  <span className='center'>{`${parseInt(String(getWinRate(freeData.summary.wins, freeData.summary.losses) * 100))}%`}</span>
                </div>
                <div className='number-wrapper'>
                  <div className='number-format'>
                    <span className='kill'>{ freeData.summary.kills }</span>
                    <span className='slash'>{ ' / ' }</span>
                    <span className='death'>{ freeData.summary.deaths }</span>
                    <span className='slash'>{ ' / ' }</span>
                    <span className='assist'>{ freeData.summary.assists }</span>
                  </div>
                  <div className='kda-wrapper number-format'>
                    <span className={`kda ${getKdaColor(getKda(freeData.summary.kills, freeData.summary.deaths, freeData.summary.assists))}`}>{
                      (getKda(freeData.summary.kills, freeData.summary.deaths, freeData.summary.assists)).toFixed(2)
                    }</span>
                    <span className={`kda-unit ${getKdaColor(getKda(freeData.summary.kills, freeData.summary.deaths, freeData.summary.assists))}`}>{ ':1' }</span>
                    <span className={`win-rate ${parseInt(String(getWinRate(freeData.summary.wins, freeData.summary.losses) * 100)) >= 60 ? 'good' : '' }`}>{
                      `(${parseInt(String(getWinRate(freeData.summary.wins, freeData.summary.losses) * 100))}%)`
                    }</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='most-champ-wrapper section'>
              {
                freeData.champions[0] ?
                <div className='champ-item'>
                  <div className='icon-wrapper'>
                    <img src={freeData.champions[0].imageUrl} />
                  </div>
                  <div className='info-wrapper'>
                    <div className='name'>{ freeData.champions[0].name }</div>
                    <div className='kda-win-rate'>
                      <span className={`win-rate ${parseInt(String(getWinRate(freeData.champions[0].wins, freeData.champions[0].losses) * 100)) >= 60 ? 'good' : ''}`}>
                        {`${parseInt(String(getWinRate(freeData.champions[0].wins, freeData.champions[0].losses) * 100))}`}
                      </span>
                      <span className={`win-rate-unit ${parseInt(String(getWinRate(freeData.champions[0].wins, freeData.champions[0].losses) * 100)) >= 60 ? 'good' : ''}`}>
                        {'%'}
                      </span>
                      <span className='win-lose'>
                        {`(${freeData.champions[0].wins}승 ${freeData.champions[0].losses}패)`}
                      </span>
                      <span className='divider-line'>{'|'}</span>
                      <span className={`kda ${getKdaColor(getKda(freeData.champions[0].kills, freeData.champions[0].deaths, freeData.champions[0].assists))}`}>
                        {`${(getKda(freeData.champions[0].kills, freeData.champions[0].deaths, freeData.champions[0].assists)).toFixed(2)} 평점`}
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
              }
              {
                freeData.champions[1] ?
                <div className='champ-item'>
                  <div className='icon-wrapper'>
                    <img src={freeData.champions[1].imageUrl} />
                  </div>
                  <div className='info-wrapper'>
                    <div className='name'>{ freeData.champions[1].name }</div>
                    <div className='kda-win-rate'>
                      <span className={`win-rate ${parseInt(String(getWinRate(freeData.champions[1].wins, freeData.champions[1].losses) * 100)) >= 60 ? 'good' : ''}`}>
                        {`${parseInt(String(getWinRate(freeData.champions[1].wins, freeData.champions[1].losses) * 100))}`}
                      </span>
                      <span className={`win-rate-unit ${parseInt(String(getWinRate(freeData.champions[1].wins, freeData.champions[1].losses) * 100)) >= 60 ? 'good' : ''}`}>
                        {'%'}
                      </span>
                      <span className='win-lose'>
                        {`(${freeData.champions[1].wins}승 ${freeData.champions[1].losses}패)`}
                      </span>
                      <span className='divider-line'>{'|'}</span>
                      <span className={`kda ${getKdaColor(getKda(freeData.champions[1].kills, freeData.champions[1].deaths, freeData.champions[1].assists))}`}>
                        {`${(getKda(freeData.champions[1].kills, freeData.champions[1].deaths, freeData.champions[1].assists)).toFixed(2)} 평점`}
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
              }
              {
                freeData.champions[2] ?
                <div className='champ-item'>
                  <div className='icon-wrapper'>
                    <img src={freeData.champions[2].imageUrl} />
                  </div>
                  <div className='info-wrapper'>
                    <div className='name'>{ freeData.champions[2].name }</div>
                    <div className='kda-win-rate'>
                      <span className={`win-rate ${parseInt(String(getWinRate(freeData.champions[2].wins, freeData.champions[2].losses) * 100)) >= 60 ? 'good' : ''}`}>
                        {`${parseInt(String(getWinRate(freeData.champions[2].wins, freeData.champions[2].losses) * 100))}`}
                      </span>
                      <span className={`win-rate-unit ${parseInt(String(getWinRate(freeData.champions[2].wins, freeData.champions[2].losses) * 100)) >= 60 ? 'good' : ''}`}>
                        {'%'}
                      </span>
                      <span className='win-lose'>
                        {`(${freeData.champions[2].wins}승 ${freeData.champions[2].losses}패)`}
                      </span>
                      <span className='divider-line'>{'|'}</span>
                      <span className={`kda ${getKdaColor(getKda(freeData.champions[2].kills, freeData.champions[2].deaths, freeData.champions[2].assists))}`}>
                        {`${(getKda(freeData.champions[2].kills, freeData.champions[2].deaths, freeData.champions[2].assists)).toFixed(2)} 평점`}
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
              }
            </div>
            <div className='position-wrapper section'>
              <div className='section-title'>{ '선호 포지션 (랭크)' }</div>
              {
                freeData.positions.map(position => {
                  return (
                    <div className='position-item' key={`position-item-${position.positionName}-${position.games}`}>
                      <div className='icon-wrapper'>
                        <img src={getMostPositionImage(position.position)} />
                      </div>
                      <div className='info-wrapper'>
                        <div className='name'>{ getMostPositionName(position.position) }</div>
                        <div className='pick-rate-wrapper'>
                          <span className='pick-rate'>{ parseInt(String(position.games / (totalData ? totalData.games.length : 1) * 100)) }</span>
                          <span className='pick-rate-unit'>{'%'}</span>
                          <span className='divider-line'>{'|'}</span>
                          <span className='win-rate-unit'>{'승률'}</span>
                          <span className='win-rate'>{ parseInt(String(position.wins / position.games * 100)) }</span>
                          <span className='win-rate-unit'>{'%'}</span>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </> :
          <div className='empty-data'>
            {'정보가 없습니다.'}
          </div>
        )
      }
    </div>
  </div>

}

export default MostPickInfo