import { TableCellsIcon, Squares2X2Icon } from '@heroicons/react/24/solid'
import type { NavProps } from '../interfaces'

/* 
 * Nav component for switching between table and grid views
 * Arguments:
 * - active: Current active view ('table' or 'grid')
 * - onChange: Function to call when the view changes
 * Returns:
 * - A navigation bar with buttons to switch views
*/
export function Nav({ active, onChange }: NavProps) {
  return (
    <nav className="flex justify-center text-xl gap-6 p-4 bg-white shadow-md rounded-md">
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded cursor-pointer ${
          active === 'table' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
        }`}
        onClick={() => onChange('table')}
      >
        <TableCellsIcon className="w-5 h-5" />
        Tabla
      </button>

      <button
        className={`flex items-center gap-2 px-4 py-2 rounded cursor-pointer ${
          active === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
        }`}
        onClick={() => onChange('grid')}
      >
        <Squares2X2Icon className="w-5 h-5" />
        Grid
      </button>
    </nav>
  )
}
