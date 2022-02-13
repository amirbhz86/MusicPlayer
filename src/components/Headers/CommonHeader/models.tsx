export interface PropsType {
  title?: string
  style?: any
  rightIcon?:
    | 'Nothing'
    | 'NewPlaylist'
    | 'Search'
    | 'ThreeDot'
    | 'PlayListMusics'
  navigation?: any
  rightIconPress?: () => void
  onBack?: () => void
  hasBack?: boolean
}
