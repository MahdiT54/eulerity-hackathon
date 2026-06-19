import type { Pet } from '../types/pet';

export function filterPets(pets: Pet[], query: string): Pet[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return pets; // if no query, return all pets

  return pets.filter(
    (pet) =>
      pet.title.toLowerCase().includes(normalized) ||
      pet.description.toLowerCase().includes(normalized),
  );
}
