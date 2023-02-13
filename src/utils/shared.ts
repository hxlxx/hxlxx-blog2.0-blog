export const emptyObject = (target: object) => {
  if (!target) return true
  const keys = Object.keys(target)
  return keys.length === 0
}
