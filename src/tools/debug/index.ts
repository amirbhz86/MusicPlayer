const DEBUG_PREFIX_INFO = '⚪️  [LOG]: '
const DEBUG_PREFIX_ERROR = '🔴  [ERROR]: '
const DEBUG_PREFIX_SUCCESS = '🟢  [SUCCESS]: '

/* You should change debugMode to false if you are in production mode */
const debugMode = true

/* Custome log for debuging mode with three type of logs and using Prefix before logs */

export const debugInfo = (...inputs: any[]) => {
  debugMode && console.info(DEBUG_PREFIX_INFO, ...inputs)
}

export const debugError = (...inputs: any[]) => {
  debugMode && console.info(DEBUG_PREFIX_ERROR, ...inputs)
}

export const debugSuccess = (...inputs: any[]) => {
  debugMode && console.info(DEBUG_PREFIX_SUCCESS, ...inputs)
}
