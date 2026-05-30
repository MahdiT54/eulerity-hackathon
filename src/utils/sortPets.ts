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
      return sorted.sort((a, b) => Date.parse(b.created) - Date.parse(a.created));
    case 'date-oldest':
      return sorted.sort((a, b) => Date.parse(a.created) - Date.parse(b.created));
    default:
      return sorted;
  }
}
