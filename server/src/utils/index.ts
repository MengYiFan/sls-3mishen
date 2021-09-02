export const createUUID = ({
  format = 'xxxxxx-yxyyxy-xxxxxx', hasTimestamp = true
}: {
  format: string; hasTimestamp?: boolean
}): string => {
  let uuid = format.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0, 
        v = c === 'x' ? r : (r & 0x3 | 0x8)

    return v.toString(16)
  })

  return hasTimestamp 
    ? `${uuid}-t-${(+new Date).toString(16)}` 
    : uuid
}