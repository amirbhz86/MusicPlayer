export const apiErrorMessage = (location, err) => {
  if (err.response) {
    const { status } = err.response
    console.log(`${location}\n`, err.response)
    if (status === 400) {
      return
    }
  } else {
    console.log(err)
  }
}
