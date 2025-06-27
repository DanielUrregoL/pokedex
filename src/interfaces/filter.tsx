export interface FilterProps {
  types: string[]
  selected: string[]
  onChange: (types: string[]) => void
}