import { useEffect, useState } from 'react'
import axios from 'axios'
import type { Pokemon } from '../interfaces'
import { POKE_API_URL } from '../config'

/*
* Custom hook to fetch Pokémon data from the PokéAPI.
* Returns an array of Pokémon and a loading state.
*
* @returns {Object} An object containing the pokemons array and loading state.
*/

export const usePokemon = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const base = await axios.get(`${POKE_API_URL}`)
      const results = base.data.results

      const details = await Promise.all(
        results.map((pokemon: any) => axios.get(pokemon.url).then(res => res.data))
      )

      setPokemons(details)
      setLoading(false)
    }

    fetchData()
  }, [])

  return { pokemons, loading }
}
