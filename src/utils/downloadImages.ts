import type { Pet } from '../types/pet';

function sanitizeFilename(title: string): string {
  return title.replace(/[^a-z0-9-_]+/gi, '-').replace(/-+/g, '-').toLowerCase();
}

async function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function downloadSelectedPets(pets: Pet[]): Promise<void> {
  for (const pet of pets) {
    const response = await fetch(pet.imageUrl);
    if (!response.ok) continue;

    const blob = await response.blob();
    const extension = blob.type.split('/')[1] || 'jpg';
    await downloadBlob(blob, `${sanitizeFilename(pet.title)}.${extension}`);
  }
}
