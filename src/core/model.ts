export interface LadderRank {
  rank: number
  rankPercentOfTop: number
}

export interface TierRank {
  division: string
  imageUrl: string
  lp: number
  name: string
  season: number
  shortString: string
  string: string
  tier: string
  tierDivision: string
  tierRankPoint: number
}

export interface League {
  hasResults:	boolean
  losses: number
  tierRank: TierRank
  wins: number
}

export interface Summoner {
  ladderRank:	LadderRank
  leagues: League[]
  level: number
  name:	string
  previousTiers: TierRank[]
  profileBackgroundImageUrl: string
  profileBorderImageUrl: string
  profileImageUrl: string
  url: string
}