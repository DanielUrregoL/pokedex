import { getTypeIcon } from '../utils'
import type { FilterProps } from '../interfaces'

/*
 * Filter component for selecting Pokémon types
 * Arguments:
 * - types: Array of Pokémon types to display
 * - selected: Array of currently selected types
 * - onChange: Function to call when selection changes
 * Returns:
 * - A set of buttons for each type that toggle selection on click
*/
export function Filter({ types, selected, onChange }: FilterProps) {
  const toggleType = (type: string) => {
    if (selected.includes(type)) {
      onChange(selected.filter(t => t !== type))
    } else {
      onChange([...selected, type])
    }
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center items-center my-6">
      {types.map(type => (
        <button
          key={type}
          onClick={() => toggleType(type)}
          className={`w-10 h-10 rounded-full cursor-pointer border-2 p-1 hover:scale-105 transition hover:border-blue-400
            ${selected.includes(type) ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}
          `}
          title={type}
        >
          <img
            src={getTypeIcon(type)}
            alt={type}
            className="w-full h-full object-contain"
          />
        </button>
      ))}
    </div>
  )
}
