export interface AppStates {
  tabSelected?: 'Home' | 'PlayList' | 'Favorites' | 'Search'
  addToPlayListModal?: boolean
  addNewModal?: boolean
  playingMusics?: any[]
  songSliderRef?: any
  playedMusicId?: string
  showMusicController?: boolean
  lastUpdatedFavorite?: null | number
  musicController?: {
    show: boolean
    duration?: number
    musicName?: string
    artistName?: string
    artwork?: string
    index?: number
    id?: string
  }
  recentMusics?: any[]
  isLighttheme?: boolean
  playlists?: any[]
}
