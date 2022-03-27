import React, { useEffect, useState } from 'react'
import { getMatchInfo, getMostInfo } from '../../../../core/api'
import { MatchData, MostChampion, RecentChampion, Summoner } from '../../../../core/model'
import MatchList from '../match-list/MatchList'
import MostPickInfo from '../most-pick-info/MostPicklInfo'
import RankInfoWrapper from '../rank-info-wrapper/RankInfoWrapper'
import WinRatesInfo from '../win-rates-info/WinRatesInfo'

import './DetailUserInfo.styl'

interface detailProps {
  data: Summoner
}

const DetailUserInfo = ({ data }: detailProps) => {
  const { leagues, name } = data
  const soloRankData = leagues.find(league => league.tierRank.name === '솔랭');
  const freeRankData = leagues.find(league => league.tierRank.name === '자유 5:5 랭크');

  const [ mostChampions, setMostChampions ] = useState<MostChampion[]>([])
  const [ recentChampions, setRecentChampions ] = useState<RecentChampion[]>([])

  const [ matchTotalData, setMatchTotalData ] = useState<MatchData | null>(null)
  const [ matchSoloData, setMatchSoloData ] = useState<MatchData | null>(null)
  const [ matchFreeData, setMatchFreeData ] = useState<MatchData | null>(null)

  const [activeNav, setActiveNav] = useState<'total' | 'solo' | 'free'>('total')
  const [matchListData, setMatchListData] = useState<any[]>([])

  const getWinRates = async () => {
    try {
      const mostInfo = await getMostInfo(name)

      if (mostInfo.data) {
        // 게임 수 기준으로 정렬 필요
        setMostChampions(mostInfo.data.champions ? mostInfo.data.champions : [])
        setRecentChampions(mostInfo.data.recentWinRate ? mostInfo.data.recentWinRate : [])
      } else {
        setMostChampions([])
        setRecentChampions([])
      }
    } catch (err) { console.log(err) }
  }

  const getMatches = async () => {
    try {
      const matchInfo = await getMatchInfo(name)

      setMatchTotalData(matchInfo.data)
      const soloMatches = matchInfo.data.games.filter((game: { gameType: string }) => game.gameType === '솔랭')
      const freeMatches = matchInfo.data.games.filter((game: { gameType: string }) => game.gameType === '자유 5:5 랭크')

      setMatchSoloData(Object.assign({
        ...matchInfo.data,
        games: soloMatches,
        summary: {
          ...matchInfo.data.summary,
          losses: soloMatches.filter((match: { isWin: boolean }) => !match.isWin).length,
          wins: soloMatches.filter((match: { isWin: boolean }) => match.isWin).length
        }
      }))
      setMatchFreeData(Object.assign({
        ...matchInfo.data,
        games: freeMatches,
        summary: {
          ...matchInfo.data.summary,
          losses: freeMatches.filter((match: { isWin: boolean }) => !match.isWin).length,
          wins: freeMatches.filter((match: { isWin: boolean }) => match.isWin).length
        }
      }))

      setMatchListData(matchInfo.data.games)
    } catch (err) { console.log(err) }
  }

  const handleChangeTab = (nav: 'total' | 'solo' | 'free') => {
    setActiveNav(nav)

    if (nav === 'total') {
      setMatchListData(matchTotalData ? matchTotalData.games : [])
    } else if (nav === 'solo') {
      setMatchListData(matchSoloData ? matchSoloData.games : [])
    } else if (nav === 'free') {
      setMatchListData(matchFreeData ? matchFreeData.games : [])
    }
  }

  useEffect(() => {
    getWinRates()
    getMatches()
  }, [data])

  return (
    <div className='middle-wrapper'>
      <div className='left-section'>
        <RankInfoWrapper 
          soloRankData={soloRankData}
          freeRankData={freeRankData}
        />
        <WinRatesInfo
          mostChampions={mostChampions}
          recentChampions={recentChampions}
        />
      </div>
      <div className='right-section'>
        <MostPickInfo 
          totalData={matchTotalData}
          soloData={matchSoloData}
          freeData={matchFreeData}
          handleChangeTab={handleChangeTab}
        />
        <MatchList
          userName={name}
          data={matchListData}
        />
      </div>
    </div>
  )
}

export default DetailUserInfo