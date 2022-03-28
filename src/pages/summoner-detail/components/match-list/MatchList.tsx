import React, { useEffect, useState } from 'react'
import { getMatchDetail } from '../../../../core/api'
import MatchItem from './components/match-item/MatchItem'

import './MatchList.styl'

interface props {
  userName: string
  data: any[]
}

const MatchList = ({ userName, data }: props) => {
  
  const [details, setDetails] = useState<any>([])

  const getGameDetails = async () => {
    try {
      const newDetails = []
      for(const game of data) {
        const gameDetail = await getMatchDetail(userName, game.gameId)
        const gameDetailInfo = {
          game: game,
          teams: gameDetail.teams,
        }
        newDetails.push(gameDetailInfo)
      }
      setDetails(newDetails)
    } catch (err) { console.log(err) }
  }

  useEffect(() => {
    getGameDetails()
  }, [data])

  return (
    <div className='match-list-wrapper'>
      {
        details.length !== 0 ?
        details.map((detail: { game: { gameId: string } }) => {
          return (
            <MatchItem data={detail} key={`match-detail-item-${detail.game.gameId}`}/>
          )
        }) :
        <div className='empty-text'>{' 매치 정보가 없습니다. '}</div>
      }
    </div>
  )
}

export default MatchList