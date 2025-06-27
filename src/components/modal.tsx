import { getTypeIcon } from '../utils'
import { XMarkIcon } from '@heroicons/react/16/solid'
import { PokemonStats } from './pokemonStats';
import type { Pokemon } from '../interfaces';


export function Modal({ pokemon, onClose }: { pokemon: Pokemon; onClose: () => void }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/50">
            <div className="relative bg-white rounded-lg shadow-lg p-10 w-full max-w-6xl flex gap-6">
                {/* ID */}
                <span className="absolute top-4 left-6 font-semibold text-2xl">
                    #{pokemon.id}
                </span>
                {/* close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <XMarkIcon className="w-8 h-8 cursor-pointer" />
                </button>

                {/* pokemon panel */}
                <div className="flex-1 flex flex-col items-center border-r pr-4">
                    <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        className="w-80 h-80 object-contain "
                    />
                    <h2 className="text-3xl font-bold capitalize ">{pokemon.name}</h2>

                    {/* Types */}
                    <div className="flex gap-2 mt-2">
                        {pokemon.types.map((type: any) => (
                            <img
                                key={type.type.name}
                                src={getTypeIcon(type.type.name)}
                                alt={type.type.name}
                                title={type.type.name}
                                className="w-8 h-8"
                            />
                        ))}
                    </div>

                    {/* Basic data */}
                    <div className="grid grid-cols-1 mt-5 text-gray-600 bg-gray-200 p-4 rounded-lg gap-x-4 gap-y-2 text-center sm:text-left lg:text-xl">
                        <p><strong>Height:</strong> {pokemon.height / 10} m</p>
                        <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
                        <p><strong>Base Exp:</strong> {pokemon.base_experience}</p>
                    </div>

                </div>

                {/* Stats Panel */}
                <div className="flex-1">
                    <PokemonStats stats={pokemon.stats} />
                </div>
            </div>
        </div>
    )
}
