import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from "@heroicons/react/16/solid"
import type { PaginationProps } from '../interfaces'


export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-2 my-6 flex-wrap">
      {/* Arrow left */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`p-2 cursor-pointer ${
          page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
        }`}
      >
        <ChevronDoubleLeftIcon className="w-6 h-6" />
      </button>

      {/* Pages */}
      {[...Array(totalPages)].map((_, i) => {
        const pageNumber = i + 1
        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`px-3 py-1 text-lg rounded cursor-pointer ${
              pageNumber === page
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {pageNumber}
          </button>
        )
      })}

      {/* Arrow right */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={`p-2 text-lg rounded cursor-pointer ${
          page === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
        }`}
      >
        <ChevronDoubleRightIcon className="w-6 h-6" />
      </button>
    </div>
  )
}
