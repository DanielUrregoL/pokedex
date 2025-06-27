import type { Pokemon } from '../interfaces'

/*
 * Utility function to get a list of unique Pokémon types from an array of Pokémon
 * Arguments:
 * - pokemons: Array of Pokémon to extract types from
 * Returns:
 * - An array of unique Pokémon types
 */
export function getUniqueTypes(pokemons: Pokemon[]): string[] {
  const types = new Set<string>()
  pokemons.forEach(p =>
    p.types.forEach(t => types.add(t.type.name))
  )
  return Array.from(types).sort()
}
