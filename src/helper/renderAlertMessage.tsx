import { strings } from 'common/index'

export const renderAlertMessage = (value: any) => {
  switch (value) {
    case 'Invalid credentials given.':
      return strings.wrongOtp
    default:
      return
  }
}
