import React, { useEffect, useRef, useState } from 'react'

import { getSummoner } from '../../core/api'
import { Summoner } from '../../core/model'
import { getRecent, saveRecent } from '../../core/util'

import './Header.styl'

interface HeaderProps {
  handleSelectSummoner: (name: string) => void
}

const Header = ({handleSelectSummoner}: HeaderProps) => {
  let searchTimeoutInstance: any = null;
  const listRef = useRef<any>()
  const recentRef = useRef<any>()

  const [searchValue, setSearchValue] = useState('')
  const [searchItem, setSearchItem] = useState<Summoner | null>(null)
  const [recentList, setRecentList] = useState(getRecent())

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
      setRecentList(getRecent())
      setShowRecent(true)
      setShowList(false)
    }
  }

  const handleSelectUser = () => {
    if (searchItem) {
      saveRecent(searchItem.name);
      setShowRecent(false);
      setShowList(false);
      setRecentList(getRecent())
      handleSelectSummoner(searchItem.name)
    }
  }

  const handleSelectRecent = (name: string) => {
    saveRecent(name)
    setShowRecent(false);
    setShowList(false);
    setRecentList(getRecent())
    handleSelectSummoner(name)
  }

  const handleClickOutside = (e: { target: any }) => {
    if (showList) {
      if (!listRef.current.contains(e.target)) {
        setShowList(false);
      }
    }

    if (showRecent) {
      if (!recentRef.current.contains(e.target)) {
        setShowRecent(false);
      }
    }
  }

  // useEffect useState
  useEffect(() => {
    if (searchValue) {
      if (searchTimeoutInstance) searchTimeoutInstance = null
      searchTimeoutInstance = setTimeout(() => {
        handleSearchResult()
      }, 100)
    }
  }, [searchValue])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  })

  return (
    <div className='header-wrapper'>
      <div className='input-wrapper'>
        <input 
          type='text'
          value={searchValue}
          onChange={handleChange}
          placeholder={'소환사명, 챔피언..'}
          onFocus={() => { if (!searchValue) { setShowRecent(true); setShowList(false) } else { setShowRecent(false); setShowList(true) } }}
          // onBlur={() => { setShowRecent(false); setShowList(false) }}
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
            <div className='search-result' ref={listRef}>
              <div className='search-item' onClick={handleSelectUser}>
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
              <div className='empty-text'>
                {'검색 결과 없음'}
              </div>
            </div>
          )
        }
        {
          showRecent &&
          <div className='recent-list' ref={recentRef}>
            <div className='recent-list-nav'>
              <div className='nav-item active'>
                {'최근항목'}
              </div>
              <div className='nav-item'>
                {'즐겨찾기'}
              </div>
            </div>
            {
              recentList.map((item: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined) => {
                return (
                  <div className='recent-item' key={`recent-item-${item}`} onClick={ () => {
                      handleSelectRecent(String(item))
                    } }>
                    { item }
                  </div>
                )
              })
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Header
