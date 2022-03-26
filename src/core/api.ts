import axios from '../plugins/axios'
import { Summoner } from './model'
// import qs from 'qs'

export const getSummoner = async (name: string) => {
  try {
    const data: any = await axios.get(`/api/summoner/${name}`, { blockUI: false })
    return data
  } catch (err) { console.log(err) }
}