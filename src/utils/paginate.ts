/* 
  * Utility function to paginate an array of items
  * Arguments:
  * - items: Array of items to paginate
  * - page: Current page number (1-indexed)
  * - pageSize: Number of items per page
  * Returns:
  * - A slice of the items array for the specified page
*/

export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize
  return items.slice(start, start + pageSize)
}
