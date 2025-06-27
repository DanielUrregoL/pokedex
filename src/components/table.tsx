import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table'
import { useState } from 'react'
import type { SortingState } from '@tanstack/react-table'
import type { Pokemon } from '../interfaces'
import { getTypeIcon } from '../utils'
import { EyeIcon, ChevronDoubleDownIcon, ChevronDoubleUpIcon } from '@heroicons/react/16/solid'

const columnHelper = createColumnHelper<Pokemon>()

export function PokemonTable({ pokemons, onSelect }: { pokemons: Pokemon[]; onSelect: (p: Pokemon) => void }) {
    const [sorting, setSorting] = useState<SortingState>([])

    const columns = [
        columnHelper.accessor(row => row.sprites.front_default, {
            id: 'image',
            header: 'Imagen',
            cell: info => <img src={info.getValue()} alt="sprite" className="w-30 h-30 object-contain" />,
            enableSorting: false
        }),
        columnHelper.accessor('name', {
            header: 'Nombre',
            cell: info => <span className="capitalize">{info.getValue()}</span>
        }),
        columnHelper.accessor(row => row.types.map(t => t.type.name).join(', '), {
            id: 'types',
            header: 'Tipo(s)',
            cell: info => (
                <div className="flex gap-1 justify-center">
                    {info.getValue().split(', ').map((type: string) => (
                        <img key={type} src={getTypeIcon(type)} alt={type} title={type} className="w-8 h-8 border-gray-500 rounded-full" />
                    ))}
                </div>
            ),
        }),
        columnHelper.accessor(row => row.weight / 10, {
            id: 'weight',
            header: 'Peso (kg)',
            cell: info => info.getValue().toFixed(1)
        }),
        columnHelper.accessor(row => row.height / 10, {
            id: 'height',
            header: 'Altura (m)',
            cell: info => info.getValue().toFixed(1)
        }),
        columnHelper.accessor(row => row.stats.find(s => s.stat.name === 'hp')?.base_stat ?? 0, {
            id: 'hp',
            header: 'Salud base'
        }),
        columnHelper.accessor('base_experience', {
            header: 'Experiencia base'
        }),
        columnHelper.accessor(row => row.stats.find(s => s.stat.name === 'attack')?.base_stat ?? 0, {
            id: 'attack',
            header: 'Ataque base'
        }),
        columnHelper.accessor(row => row.stats.find(s => s.stat.name === 'defense')?.base_stat ?? 0, {
            id: 'defense',
            header: 'Defensa base'
        }),
        columnHelper.accessor(row => row.stats.find(s => s.stat.name === 'special-attack')?.base_stat ?? 0, {
            id: 'spAtk',
            header: 'Ataque especial'
        }),
        columnHelper.accessor(row => row.stats.find(s => s.stat.name === 'special-defense')?.base_stat ?? 0, {
            id: 'spDef',
            header: 'Defensa especial'
        }),
        columnHelper.accessor(row => row.stats.find(s => s.stat.name === 'speed')?.base_stat ?? 0, {
            id: 'speed',
            header: 'Velocidad'
        }),
        columnHelper.display({
            id: 'details',
            header: 'Ver detalles',
            cell: info => (
                <button
                    onClick={() => onSelect(info.row.original)}
                    className="text-blue-600 cursor-pointer"
                >
                    <EyeIcon className="w-8 h-8" />
                </button>
            )
        })
    ]

    const table = useReactTable({
        data: pokemons,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel()
    })

    return (
        <div className="overflow-auto">
            <table className="min-w-full divide-y divide-gray-200 border">
                <thead className="bg-gray-100">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                                    className="px-2 py-3 text-center text-lg cursor-pointer select-none"
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {{
                                        asc: <ChevronDoubleUpIcon className="w-6 h-6 inline text-green-500" />,
                                        desc: <ChevronDoubleDownIcon className="w-6 h-6 inline text-red-500" />
                                    }[header.column.getIsSorted() as string] ?? ''}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="hover:bg-gray-100">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="px-2 py-2 text-center text-lg">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
