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
    <div className="p-4 bg-gray-200 min-h-screen">
      <Nav active={view} onChange={setView} />

      {/* Filtro por tipo */}
      <Filter
        types={getUniqueTypes(pokemons)}
        selected={selectedTypes}
        onChange={setSelectedTypes}
      />

      {/* Tabla o grid */}
      <div className="mt-6">
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

      {/* Paginación */}
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
