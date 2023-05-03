import emoji from './emoji'

export const emptyObject = (target: object) => {
  if (!target) return true
  const keys = Object.keys(target)
  return keys.length === 0
}

/**
 * @description: 将字符串中的emoji字符转换为对应图片
 * @param {string} content
 * @return {string} 解析后的字符串
 */
export const parseComment = (content: string) => {
  if (!content?.trim()) return ''
  const emojiReg = /\[(\S+?)\]/g
  return content.replace(emojiReg, (match) => {
    return `<img style="display: inline-block; width: 20px; height: 20px; margin: 0 1px;" src="${
      (emoji.allEmoji as any)[match]
    }" title="${match}"></img>`
  })
}
