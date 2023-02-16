import emoji from './emoji'

export const emptyObject = (target: object) => {
  if (!target) return true
  const keys = Object.keys(target)
  return keys.length === 0
}

export const parseComment = (content: string) => {
  if (!content?.trim()) return ''
  const emojiReg = /\[(\S+?)\]/g
  return content.replace(emojiReg, (match) => {
    return `<img style="display: inline-block; width: 20px; height: 20px; margin: 0 1px;" src="${
      (emoji.allEmoji as any)[match]
    }" title="${match}"></img>`
  })
}
