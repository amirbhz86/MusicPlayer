import { useState } from 'react'
import { debugInfo } from 'tools'

const useLazyLoad = (
  data: any[] = [],
  setData: any = () => null,
  request: any = () => null,
  limit?: number,
  initialLoading?: boolean,
  convertData: (value: any[]) => any[] = (value) => value,
  ...optionArguments: any
) => {
  const [finished, setFinished] = useState(false)
  const [loading, setLoading] = useState<boolean>(
    initialLoading ? initialLoading : true,
  )

  const loadList = async (reset: boolean = false, ...options: any) => {
    const dataSize = data.length

    if (reset === true || dataSize === 0 || !finished) {
      setLoading(true)

      const response = await request(...optionArguments, ...options)

      if (response !== null) {
        const { allLoaded, Stationss } = response
        if (reset) {
          setData(convertData(Stationss))
        } else {
          setData(data.concat(convertData(Stationss)))
        }
        if (!allLoaded) {
          setFinished(true)
        }
      }
      setLoading(false)
    }
  }

  return { loading, setLoading, loadList, finished, setFinished }
}

export default useLazyLoad
