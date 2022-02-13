import { debugError } from 'tools'

export const apiErrorMessage = (location, err) => {
  if (err.response) {
    const { status } = err.response
    debug.error(`${location}\n`, err.response)
    if (status === 400) {
      return
    }
  } else {
    debugError(err)
  }
}
