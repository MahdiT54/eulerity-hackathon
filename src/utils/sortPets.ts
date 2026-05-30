import type { Pet } from '../types/pet';

export type SortOption = 'name-asc' | 'name-desc' | 'date-newest' | 'date-oldest';

export function sortPets(pets: Pet[], sortBy: SortOption): Pet[] {
  const sorted = [...pets];

  switch (sortBy) {
    case 'name-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'name-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case 'date-newest':
      return sorted.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    case 'date-oldest':
      return sorted.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
    default:
      return sorted;
  }
}
