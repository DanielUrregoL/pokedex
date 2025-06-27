export const getTypeIcon = (type: string): string => {
  try {
    const typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1)
    const fileName = `${typeCapitalized} type.ico`.replace(' ', '%20')

     return `/icons/${fileName}`
  } catch {
    return ''
  }
}
