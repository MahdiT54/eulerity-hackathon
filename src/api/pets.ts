import { normalizePets } from './normalizePets';
import type { Pet } from '../types/pet';
import type { PetApiRecord } from '../types/pet';

export async function fetchPets(): Promise<Pet[]> {
  const response = await fetch('/pets');

  if (!response.ok) {
    throw new Error(`Failed to fetch pets (${response.status})`);
  }

  const records = (await response.json()) as PetApiRecord[];
  return normalizePets(records);
}
