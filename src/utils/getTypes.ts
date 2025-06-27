import type { Pokemon } from '../interfaces'

export function getUniqueTypes(pokemons: Pokemon[]): string[] {
  const types = new Set<string>()
  pokemons.forEach(p =>
    p.types.forEach(t => types.add(t.type.name))
  )
  return Array.from(types).sort()
}
