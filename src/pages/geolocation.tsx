import { createSignal } from 'solid-js'

export default () => {
  const [coords, setCoords] = createSignal<[number, number]>()
  const [message, setMessage] = createSignal('')
  const [time, setTime] = createSignal(0)

  const t = setInterval(() => {
    setTime(value => ++value)
  }, 1000)

  navigator.geolocation.getCurrentPosition(
    (position) => {
      clearInterval(t)
      setCoords([position.coords.longitude, position.coords.latitude])
      setMessage('成功')
    },
    (error) => {
      // 错误处理
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setMessage('用户拒绝了定位请求。')
          break
        case error.POSITION_UNAVAILABLE:
          setMessage('位置信息不可用。')
          break
        case error.TIMEOUT:
          setMessage('请求超时。')
          break
        default:
          setMessage(`未知错误: ${error.message}`)
      }
    },
  )
  return (
    <div>
      <div>{JSON.stringify(coords())}</div>
      <div>{time()}</div>
      <div>{message()}</div>
    </div>
  )
}
