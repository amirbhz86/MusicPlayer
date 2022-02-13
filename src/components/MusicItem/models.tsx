export interface PropsType {
  id?: string
  name?: string
  summary?: string
  content?: string | null
  status?: string
  image?: any
  image_image?: string
  popularity?: string
  proxy_mode?: string
  proxy_url?: string
  tags?: string
  updated_at?: string
  url?: string
  url_key?: string
  style?: any
  navigation?: any
  musics?: any
  artwork?: string
  songIndex?: any
  duration?: number
  onAdd?: () => void
  selected?: boolean
  summery?: string
}

export interface HookPropsType extends PropsType {
  navigation?: any
  musics?: any[]
  id?: string
  songIndex?: number
  duration?: number
}
