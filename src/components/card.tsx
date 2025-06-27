import type { Pokemon } from "../interfaces"
import { getTypeIcon } from '../utils'

/*
 * Card component for displaying Pokémon information
 * Arguments:
 * - pokemon: The Pokémon data to display
 * - onClick: Function to call when the card is clicked
 * Returns:
 * - A card element with Pokémon details including ID, types, image, and name
 * If no Pokémon data is provided, it displays a message indicating that no data is available.
*/
export function Card({ pokemon, onClick }: { pokemon: Pokemon, onClick: () => void }) {
  if (!pokemon) {
    return <div className="text-center mt-10 text-xl font-medium">No Pokémon data available</div>
  }
  return (
    <div className="relative bg-white shadow-md rounded-lg p-4 max-w-sm mx-auto text-center cursor-pointer 
    hover:dark:bg-red-400 transition-colors duration-300
    hover:shadow-xl 
    hover:text-white"
      onClick={onClick}>
      {/* ID */}
      <span className="absolute top-4 right-6 font-semibold text-2xl">
        #{pokemon.id}
      </span>

      {/* Types*/}
      <div className="flex justify-start gap-2">
        {pokemon.types.map((t) => (
          <img
            key={t.type.name}
            src={getTypeIcon(t.type.name)}
            alt={t.type.name}
            title={t.type.name}
            className="w-8 h-8 border-2 border-gray-500 rounded-full"
          />
        ))}
      </div>

      {/* Image and name */}
      <div className="bg-white rounded-lg p-4 mt-4">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-80 h-80 object-contain" />
      </div>
      <h2 className="capitalize text-2xl font-bold mt-2">{pokemon.name}</h2>
    </div>
  )
}
