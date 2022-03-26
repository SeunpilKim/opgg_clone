import React, { useEffect, useState } from 'react'

import { getSummoner } from '../../core/api'
import { Summoner } from '../../core/model'

import './Header.css'

const Header = () => {
  let searchTimeoutInstance: any = null;
  const [searchValue, setSearchValue] = useState('')
  const [searchItem, setSearchItem] = useState<Summoner | null>(null)
  const [recentList, setRecentList] = useState([])

  const [showList, setShowList] = useState(false)
  const [showRecent, setShowRecent] = useState(false)
  
  // logic

  // Event Handler
  const handleSearchResult = async () => {
    try {
      const result: any = await getSummoner(searchValue)
      if (result.data) {
        setSearchItem(result.data.summoner)
      } else {
        setSearchItem(null)
      }
    } catch (err) { console.log(err) }
  }

  const handleChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    const value = e.target.value
    setSearchValue(value)
    if (value) {
      setShowRecent(false)
      setShowList(true)
    } else {
      setShowRecent(true)
      setShowList(false)
    }
  }

  // useEffect useState
  useEffect(() => {
    if (searchValue) {
      if (searchTimeoutInstance) searchTimeoutInstance = null
      searchTimeoutInstance = setTimeout(() => {
        handleSearchResult()
      }, 500)
    }
  }, [searchValue])

  return (
    <div className='header-wrapper'>
      <div className='input-wrapper'>
        <input 
          type='text'
          value={searchValue}
          onChange={handleChange}
          placeholder={'소환사명, 챔피언..'}
          onFocus={() => { if (!searchValue) { setShowRecent(true); setShowList(false) } else { setShowRecent(false); setShowList(true) } }}
          onBlur={() => { setShowRecent(false); setShowList(false) }}
        />
        <div className='icon-wrapper'>
          <span className='icon-text'>
            {'.GG'}
          </span>
        </div>
        {
          showList && 
          (
            searchItem ?
            <div className='search-result'>
              <div className='search-item'>
                <div className='user-icon-wrapper'>
                  <img src={ searchItem.profileImageUrl}/>
                </div>
                <div className='user-info-wrapper'>
                  <div className='user-name-wrapper'>
                    {searchItem.name}
                  </div>
                  <div className='user-level-wrapper'>
                    { 'Level ' + searchItem.level }
                  </div>
                </div>
              </div>
            </div> :
            <div className='search-result'>
              {'No Item'}
            </div>
          )
        }
        {
          showRecent &&
          <div className='recent-list'>
            {'recent List'}
          </div>
        }
      </div>
    </div>
  )
}

export default Header
