import { usePokemon } from './hooks/usePokemon'
import { getUniqueTypes } from './utils/getTypes'
import { Card } from './components/card'
import { Modal } from './components/modal'
import { Nav } from './components/nav'
import { Pagination } from './components/pagination'
import { PokemonTable } from './components/table'
import { Filter } from './components/filter'
import { useState } from 'react'
import type { Pokemon } from './interfaces'

function App() {
  const { pokemons, loading } = usePokemon()
  const [view, setView] = useState<'table' | 'grid'>('table')
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
  const [page, setPage] = useState(1)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const pageSize = 12

  const filtered = selectedTypes.length
    ? pokemons.filter(p =>
        p.types.some(t => selectedTypes.includes(t.type.name))
      )
    : pokemons

  const totalPages = Math.ceil(filtered.length / pageSize)
  const currentPokemons = filtered.slice((page - 1) * pageSize, page * pageSize)

  const handleCardClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon)
  }

  const closeModal = () => setSelectedPokemon(null)

  if (loading) {
    return <div className="text-center mt-10 text-xl font-medium">Loading Pokedex...</div>
  }

  return (
    <div className="bg-gray-600 min-h-screen">
      <Nav active={view} onChange={setView} />

      {/* Filter */}
      <Filter
        types={getUniqueTypes(pokemons)}
        selected={selectedTypes}
        onChange={setSelectedTypes}
      />

      {/* Component selected */}
      <div className="mt-6 container mx-auto px-4">
        {view === 'table' && (
          <PokemonTable pokemons={currentPokemons} onSelect={handleCardClick} />
        )}
        {view === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentPokemons.map(pokemon => (
              <Card key={pokemon.id} pokemon={pokemon} onClick={() => handleCardClick(pokemon)} />
            ))}
          </div>
        )}
      </div>

      {/* Signature */}
      <div className="text-center text-gray-300 my-6">
        <p className="text-lg">by @DanielUL</p>
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* Modal */}
      {selectedPokemon && (
        <Modal pokemon={selectedPokemon} onClose={closeModal} />
      )}
    </div>
  )
}

export default App
