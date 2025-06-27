/*
  * Utility function to get the icon URL for a Pokémon type
  * Arguments:
  * - type: The type of the Pokémon (e.g., 'fire', 'water')
  * Returns:
  * - A string representing the URL to the icon for the specified type
*/

export const getTypeIcon = (type: string): string => {
  try {
    const typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1)
    const fileName = `${typeCapitalized} type.ico`.replace(' ', '%20')

     return `/icons/${fileName}`
  } catch {
    return ''
  }
}
