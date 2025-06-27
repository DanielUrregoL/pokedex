/* Interfaces for Pokémon data */

export interface Pokemon {
  id: number
  name: string
  sprites: { front_default: string }
  types: { type: { name: string } }[]
  height: number
  weight: number
  base_experience: number
  stats: { base_stat: number; stat: { name: string } }[]
}
