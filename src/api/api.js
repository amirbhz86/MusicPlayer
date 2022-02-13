import axios from 'axios'
import { KEYS, strings } from 'common'
import { debug, debugInfo } from 'tools'
export const PROTOCOL = 'https://'
export const BASE_URL = 'musicdemo.thephpcode.com/' 

export const ENDPOINT_LEVEL = ''
export const TOKEN_PREFIX = 'Token'
export const URL = `${PROTOCOL}${BASE_URL}${ENDPOINT_LEVEL}`

export const getAuthToken = async () => {
  return undefined
}

const fetchUrl = async (options, alert, onUploadProgress) => {
  return new Promise((resolve, reject) => {
    axios
      .request({
        ...options,
        baseURL: options.baseURL ? options.baseURL : URL,
        headers: {
          ...options.headers,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        validateStatus: (status) => {
          if (status < 500) {
            if (status >= 200 && status < 400) {
              return true
            } else if (status === 401 || status === 403) {
              showMessage({
                message: strings.anUnknownErrorOccurred,
                type: 'danger',
                duration: 2500,
              })
              return false
            } else if (status === 404) {
              showMessage({
                message: strings.serverNotFound,
                type: 'danger',
                duration: 2500,
              })
              return false
            } else {
              showMessage({
                message: strings.anUnknownErrorOccurred,
                type: 'danger',
                duration: 2500,
              })
              return false
            }
          } else {
            return false
          }
          return false
        },
        timeout: 15000,
        onUploadProgress: (progress) => {
          if (onUploadProgress) {
            onUploadProgress(progress)
          }
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

export const api = {
  get: async (url, params = null, authorization = true, customHeader) => {
    let options = {
      method: 'GET',
      url: url,
      params,
      headers: {
        ...customHeader,
      },
    }
    if (authorization) {
      options = {
        ...options,
        headers: {
          Authorization: await getAuthToken(),
        },
      }
    }
    return fetchUrl(options)
  },
  post: async (
    url,
    data,
    params,
    authorization = true,
    customHeader,
    onUploadProgress,
  ) => {
    let options = {
      method: 'POST',
      url: url,
      data,
      ...params,
      headers: {
        ...customHeader,
      },
    }
    if (authorization) {
      options = {
        ...options,
        headers: {
          ...options.headers,
          Authorization: await getAuthToken(),
        },
      }
    }
    return fetchUrl(options, alert, onUploadProgress)
  },
  put: async (
    url,
    data,
    params,
    authorization = true,
    alert,
    onUploadProgress,
  ) => {
    let options = { method: 'PUT', url: url, data, params, headers: {} }
    if (authorization) {
      options = {
        ...options,
        headers: {
          Authorization: await getAuthToken(),
        },
      }
    }
    return fetchUrl(options, alert, onUploadProgress)
  },
  patch: async (
    url,
    data,
    params,
    authorization = true,
    alert,
    onUploadProgress,
  ) => {
    let options = { method: 'PATCH', url: url, data, params, headers: {} }
    if (authorization) {
      options = {
        ...options,
        headers: {
          Authorization: await getAuthToken(),
        },
      }
    }
    return fetchUrl(options, alert, onUploadProgress)
  },
  delete: async (url, params, authorization = true, alert) => {
    let options = { method: 'DELETE', url: url, params, headers: {} }
    if (authorization) {
      options = {
        ...options,
        headers: {
          Authorization: await getAuthToken(),
        },
      }
    }
    return fetchUrl(options, alert)
  },
}
