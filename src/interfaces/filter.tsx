/* Interface definitions for filter component props */

export interface FilterProps {
  types: string[]
  selected: string[]
  onChange: (types: string[]) => void
}