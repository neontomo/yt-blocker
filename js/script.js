let filters = []
const form = document.getElementById('input-filters')
const inputTextChannels = document.getElementById('input-text-channels')
const inputTextVideoTitles = document.getElementById('input-text-video-titles')
const outputFilters = document.getElementById('output-filters')
const copyFiltersButton = document.getElementById('copy-filters')

const processTextareaValue = (value) => value.split('\n').filter((line) => line)
const setOutputValue = (array) => {
  outputFilters.value = array.join('\n')
}

const createFilterChain = (array) =>
  array
    .map((item) => {
      const [result, flags] = item.split('/').map((part) => part.trim())
      const modifiers = flags
        ? {
            wildcard: flags.includes('*') ? '*' : '',
            insensitive: flags.includes('i') ? 'i' : '',
            spaces: flags.includes('s') ? ' ' : ''
          }
        : { wildcard: '', insensitive: '', spaces: '' }

      const title = modifiers.spaces + result + modifiers.spaces
      return `[title${modifiers.wildcard}="${title}"${modifiers.insensitive}]`
    })
    .join(', ')

const createFilter = ({ description, filter }) => {
  filters.push(`! YT Home - ${description}`, filter, '')
}

const { channels, videoTitles } = readFromUrlParams()
inputTextChannels.value = channels
inputTextVideoTitles.value = videoTitles
