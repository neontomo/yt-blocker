const saveInputsToUrlParams = (channels, videoTitles) => {
  const urlParams = new URLSearchParams()
  urlParams.set('channels', encodeURIComponent(channels.join('\n') + '\n'))
  urlParams.set(
    'videoTitles',
    encodeURIComponent(videoTitles.join('\n') + '\n')
  )
  const urlParamsString = `?${urlParams.toString()}`
  window.history.pushState({}, '', urlParamsString)
}

const readFromUrlParams = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const channels = urlParams.get('channels')
  const videoTitles = urlParams.get('videoTitles')

  const channelLines = channels ? decodeURIComponent(channels).split('\n') : []
  const videoTitlesLines = videoTitles
    ? decodeURIComponent(videoTitles).split('\n')
    : []

  return {
    channels: channelLines.filter((line) => line).join('\n'),
    videoTitles: videoTitlesLines.filter((line) => line).join('\n')
  }
}
