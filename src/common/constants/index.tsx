import { ms } from '../../helper/sizing'
import { getTabBarHeight } from '../../helper/statusBarHeight'
import React from 'react'
import { Dimensions, Image, Platform, StatusBar } from 'react-native'
import { strings } from '../languages/index'

export const screenH = Dimensions.get('screen').height
export const screenW = Dimensions.get('screen').width
export const windowH = Dimensions.get('window').height - StatusBar.currentHeight
export const windowW = Dimensions.get('window').width

export const KEYS = {
  STORAGE: {
    FAVORITES: '@favorites',
    PLAYLISTS: '@playlists',
    RECENTLIST: '@recentList',
  },
}

export const OS = Platform.OS
export const FONT_NAME = 'Ubuntu'
export const FONT_TYPE = {
  light: `${FONT_NAME}-Light`,
  medium: `${FONT_NAME}-Medium`,
  Regular: `${FONT_NAME}-Regular`,
  bold: `${FONT_NAME}-Bold`,
}

export const FONT_SIZES: {
  headingLargeTitle: number
  headingTitle: number
  heading: number
  large: number
  medium: number
  small: number
  xSmall: number
  xxSmall: number
} = {
  headingLargeTitle: 30,
  headingTitle: 25,
  heading: 20,
  large: 18,
  medium: 16,
  small: 14,
  xSmall: 12,
  xxSmall: 10,
}

export const LANGUAGES_LIST = [
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'Persian',
    value: 'fa',
  },
]

export const FIELDS_LENGTH = {
  email: {
    minLength: 10,
    maxLength: 50,
  },
}

const APP_STORE = {
  link: 'https://apps.apple.com/ca/app/',
}
const PLAY_STORE = {
  link: 'https://play.google.com/store/apps/details?id=com.supercell.clashofclans',
}
export const STORES = OS === 'android' ? PLAY_STORE : APP_STORE

export const bottomSheetSnapPoint = windowH - 587 - getTabBarHeight()

export const persianDigits = '۰۱۲۳۴۵۶۷۸۹'

export const persianMap = persianDigits.split('')

export const CONFIGURATION_REFRESH_TOKEN = {
  grant_type: 'refresh_token',
  client_secret: 'web',
  client_id: 'web',
}

export const onlyStringRegex =
  /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z\]+[' ']+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$/g
