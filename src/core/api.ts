import axios from '../plugins/axios'
import { Summoner } from './model'
// import qs from 'qs'

export const getSummoner = async (name: string) => {
  try {
    const data: any = await axios.get(`/api/summoner/${name}`, { blockUI: false })
    return data
  } catch (err) { console.log(err) }
}

export const getMostInfo = async (name: string) => {
  try {
    const data: any = await axios.get(`/api/summoner/${name}/mostInfo`)
    return data
  } catch (err) { console.log(err) }
}

export const getMatchInfo = async (name: string) => {
  try {
    const data: any = await axios.get(`/api/summoner/${name}/matches`)
    return data
  } catch (err) { console.log(err) }
}

export const getMatchDetail = async (name: string, gameId: string) => {
  try {
    const data: any = await axios.get(`/api/summoner/${name}/matchDetail/${gameId}`)
    return data.data
  } catch (err) { console.log(err) }
}