import type { Pet } from '../types/pet';

export async function fetchPets(): Promise<Pet[]> {
  const response = await fetch('/pets');

  if (!response.ok) {
    throw new Error(`Failed to fetch pets (${response.status})`);
  }

  return response.json() as Promise<Pet[]>;
}
