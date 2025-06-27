/* Interface definitions for navigation component props */

export interface NavProps {
  active: 'table' | 'grid'
  onChange: (view: 'table' | 'grid') => void
}