import { debugError, debugInfo, debugSuccess } from 'tools'
import { api } from '../../api'
import { apiErrorMessage } from '../../helpers/apiErrorHandling'

const END_POINTS = {
  allMusics: 'stations/all_stations_list/',
  categories: 'tags/top/music/',
  musicsBytag: 'stations/by_tag_list/${tag}/',
  playlists: 'playlist/all_playlists_list',
  playlistMusics: 'playlist/get/${playlistId}',
}

export const MusicsServices = {
  getMusics: async (data, params, customHeader, badRequestCallback) => {
    return await api
      .post(END_POINTS.allMusics, data, params, true, customHeader)
      .then((response) => {
        debugInfo(response, 'MusicsServices -> getMusics ')
        return response.data
      })
      .catch((err) => {
        badRequestCallback
          ? badRequestCallback(err)
          : apiErrorMessage('MusicsServices -> getMusics: ', err)
        return null
      })
  },
  getCategories: async (badRequestCallback) => {
    return await api
      .get(END_POINTS.categories, null, true)
      .then((response) => {
        debugInfo(response, 'MusicsServices -> getCategories ')
        return response.data
      })
      .catch((err) => {
        badRequestCallback
          ? badRequestCallback(err)
          : apiErrorMessage('MusicsServices -> getCategories: ', err)
        return null
      })
  },

  getMusicByTag: async (data, tag, badRequestCallback) => {
    return await api
      .post(END_POINTS.musicsBytag.replace('${tag}', tag), data, null, true)
      .then((response) => {
        debugInfo(response, 'MusicsServices -> getMusicByTag ')
        return response.data
      })
      .catch((err) => {
        badRequestCallback
          ? badRequestCallback(err)
          : apiErrorMessage('MusicsServices -> getMusicByTag: ', err)
        return null
      })
  },
  searchMusic: async (params, badRequestCallback) => {
    return await api
      .get(`?term=${params.term}#`, null, true)
      .then((response) => {
        debugSuccess('MusicsServices -> searchMusic: ', response)
        return response.data
      })
      .catch((err) => {
        badRequestCallback
          ? badRequestCallback(err)
          : apiErrorMessage('MusicsServices -> searchMusic: ', err)
        return null
      })
  },
  getPlaylists: async (badRequestCallback) => {
    return await api
      .post(END_POINTS.playlists, null, null, true)
      .then((response) => {
        debugSuccess('MusicsServices -> getPlaylists: ', response)
        return response.data.Playlists
      })
      .catch((err) => {
        badRequestCallback
          ? badRequestCallback(err)
          : apiErrorMessage('MusicsServices -> getPlaylists : ', err)
        return null
      })
  },
  getPlaylistMusics: async (playlistId, badRequestCallback) => {
    return await api
      .post(
        END_POINTS.playlistMusics.replace('${playlistId}', playlistId),
        null,
        null,
        true,
      )
      .then((response) => {
        debugSuccess('MusicsServices -> getPlaylistMusics : ', response)
        return response.data
      })
      .catch((err) => {
        badRequestCallback
          ? badRequestCallback(err)
          : apiErrorMessage('MusicsServices -> getPlaylistMusics : ', err)
        return null
      })
  },
}
