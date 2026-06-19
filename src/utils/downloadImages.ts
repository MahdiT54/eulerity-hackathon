import type { Pet } from '../types/pet';

function sanitizeFilename(title: string): string {
  return title.replace(/[^a-z0-9-_]+/gi, '-').replace(/-+/g, '-').toLowerCase();
}

async function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob); // create a object url from the blob
  const anchor = document.createElement('a');
  anchor.href = url; // set the href of the anchor tag to the object url
  anchor.download = filename; // .download is the attribute of the anchor tag that is used to download the file
  anchor.click();
  URL.revokeObjectURL(url); // revoke the object url to free up memory
}

export async function downloadSelectedPets(pets: Pet[]): Promise<void> {
  for (const pet of pets) {
    const response = await fetch(pet.url);
    if (!response.ok) continue;

    const blob = await response.blob();
    const extension = blob.type.split('/')[1] || 'jpg'; 
    await downloadBlob(blob, `${sanitizeFilename(pet.title)}.${extension}`);
  }
}
