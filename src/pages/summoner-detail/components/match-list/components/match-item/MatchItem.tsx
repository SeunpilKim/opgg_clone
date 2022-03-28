import React from 'react'
import moment from 'moment'

import TextTooltip from '../../../../../../components/common-text-tooltip/CommonTextTooltip'

import './MatchItem.styl'
import buleTeamIcon from '../../../../../../assets/icons/ic-blue-team.png'
import redTeamIcon from '../../../../../../assets/icons/ic-red-team.png'


interface props {
  data: any
}

const MatchItem = ({data} : props) => {
  const { game, teams } = data
  
  const timeForToday = (value: number) => {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
        return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  }

  const convertDuration = (value: number) => {
    const minute = parseInt(String(game.gameLength / 60))
    const second = value - minute * 60

    return `${minute}분 ${second}초`
  }

  const getTeamId = () => {
    const targetTeam = teams.find((team: { players: any[] }) => team.players.find((player: { summonerName: any }) => player.summonerName === game.summonerName))
    if (targetTeam) return targetTeam.teamId
    else return 1
  }

  const makeItemList = () => {
    const result = []
    for (let i = 0; i < 8; ++i) {
      if (game.items[i]) {
        result.push(
          <TextTooltip text={`아이템 ${i}`} key={`${game.gameId}-item-image-${i}`}>
            <div className={`item-image-wrapper ${i >= 4 ? 'below' : ''}`}>
              <img src={game.items[i].imageUrl} />
            </div>
          </TextTooltip>
        )
      } else {
        result.push(<div className={`item-image-wrapper empty ${i >= 4 ? 'below' : ''}`} key={`${game.gameId}-item-image-${i}`}>
        </div>)
      }
    }
    return result
  }

  return (
    <div className={`match-item-wrapper ${game.isWin ? 'win' : game.needRenew ? 'renew' : 'lose'}`}>
      <div className='info-wrapper'>
        <div className='game-info-wrapper'>
          <div className='game-type'>{ game.gameType }</div>
          <div className='game-created time'>{ timeForToday(game.createDate) }</div>
          <div className='game-result'>{ game.isWin ? '승리' : game.needRenew ? '다시하기' : '패배' }</div>
          <div className='game-duration time'>{ convertDuration(game.gameLength) }</div>
        </div>
        <div className='pick-info-wrapper'>
          <div className='champ-spell-rune-wrapper'>
            <div className='champ-image-wrapper'>
              <img src={game.champion.imageUrl} />
            </div>
            <div className='spell-image-wrapper'>
              <img src={game.spells[0].imageUrl} className='spell-image'/>
              <img src={game.spells[1].imageUrl} className='spell-image'/>
            </div>
            <div className='rune-image-wrapper'>
              <div className='image-wrapper'>
                <img src={game.peak[0]} className='rune-image'/>
              </div>
              <div className='image-wrapper'>
                <img src={game.peak[1]} className='rune-image'/>
              </div>
            </div>
          </div>
          <div className='champ-name'>{ '챔프 이름' }</div>
        </div>
        <div className='kda-wrapper'>
          <div className='kda'>
            <span className='kill'>{ game.stats.general.kill }</span>
            <span className='slash'>{ '/' }</span>
            <span className='death'>{ game.stats.general.death }</span>
            <span className='slash'>{ '/' }</span>
            <span className='assist'>{ game.stats.general.assist }</span>
          </div>
          <div className='kda-cal'>
            <span className='value'>{ game.stats.general.kdaString }</span>
            <span className='unit'>{'평점'}</span>
          </div>
          {
            game.stats.general.largestMultiKillString &&
            <div className='badges'>
              <span className='badge-item'>{ game.stats.general.largestMultiKillString }</span>
            </div>
          }
        </div>
        <div className='ingame-info-wrapper'>
          <div className='level'>{ `레벨 ${game.champion.level}`}</div>
          <div className='cs'>{ `${game.stats.general.cs} (${game.stats.general.csPerMin}) CS`}</div>
          <div className='assist-rate'>{ `킬관여 ${game.stats.general.contributionForKillRate}` }</div>
        </div>
        <div className='item-info-wrapper'>
          <div className='item-list-wrapper'>
            { makeItemList() }
          </div>
          <div className='team-info'>
            <div className='team-icon-wrapper'>
              {
                getTeamId() === 1 ?
                <img src={redTeamIcon} /> :
                <img src={buleTeamIcon} />
              }
            </div>
            <span className='control-ward-count'>{`제어와드 ${game.stats.ward.visionWardsBought}`}</span>
          </div>
        </div>
        <div className='red team-member-info'>
          {
            teams[0].players.map((player: { champion: { imageUrl: string }; summonerId: number, summonerName: string }) => {
              return <div className='player-wrapper' key={`${player.summonerId}-red-team-${player.summonerName}`}>
                <div className='champ-icon-wrapper'>
                  <img src={player.champion.imageUrl} />
                </div>
                <div className={`user-name ${game.summonerName === player.summonerName ? 'my-name' : ''}`}>
                  { player.summonerName }
                </div>
              </div>
            })
          }
        </div>
        <div className='blue team-member-info'>
        {
            teams[1].players.map((player: { champion: { imageUrl: string }; summonerId: number, summonerName: string }) => {
              return <div className='player-wrapper' key={`${player.summonerId}-blue-team-${player.summonerName}`}>
                <div className='champ-icon-wrapper'>
                  <img src={player.champion.imageUrl} />
                </div>
                <div className={`user-name ${game.summonerName === player.summonerName ? 'my-name' : ''}`}>
                  { player.summonerName }
                </div>
              </div>
            })
          }
        </div>

        <div className='match-detail-btn'>
        </div>
      </div>
    </div>
  )

}

export default MatchItem