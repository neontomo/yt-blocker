form.addEventListener('submit', (event) => {
  event.preventDefault()

  const channels = processTextareaValue(inputTextChannels.value)
  const videoTitles = processTextareaValue(inputTextVideoTitles.value)
  filters = []

  if (channels.length > 0) {
    const channelFilterChain = createFilterChain(channels)
    createFilter({
      description: `Hide videos based on channel names`,
      filter: `youtube.com##ytd-browse[page-subtype="home"] ytd-rich-item-renderer:has(#avatar-link:is(${channelFilterChain}))`
    })
  }

  if (videoTitles.length > 0) {
    const videoTitleFilterChain = createFilterChain(videoTitles)
    createFilter({
      description: `Hide videos based on their titles`,
      filter: `youtube.com##ytd-browse[page-subtype="home"] ytd-rich-item-renderer:has(#video-title-link:is(${videoTitleFilterChain}))`
    })
  }

  saveInputsToUrlParams(channels, videoTitles)
  setOutputValue(filters)
})

copyFiltersButton.addEventListener('click', (event) => {
  event.preventDefault()
  navigator.clipboard.writeText(outputFilters.value)
})
