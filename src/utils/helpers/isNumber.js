export const isNumber = (value) => {
  let parsed = Number(value)
  if (!isNaN(parsed)) {
    return parsed
  } else {
    return false
  }
}