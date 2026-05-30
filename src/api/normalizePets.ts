import type { Pet, PetApiRecord } from '../types/pet';

/** Pexels tiny images are roughly this size when Content-Length is unavailable */
const TINY_IMAGE_FALLBACK_BYTES = 40_000;

async function estimateImageSize(url: string): Promise<number> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const length = response.headers.get('Content-Length');
    if (length) {
      return Number.parseInt(length, 10);
    }
  } catch {
    // CORS or network failure — use fallback
  }

  return TINY_IMAGE_FALLBACK_BYTES;
}

export async function normalizePets(records: PetApiRecord[]): Promise<Pet[]> {
  const sizeEstimates = await Promise.all(records.map((record) => estimateImageSize(record.url)));

  return records.map((record, index) => ({
    id: String(index),
    title: record.title,
    description: record.description,
    url: record.url,
    created: record.created,
    fileSizeBytes: sizeEstimates[index] ?? TINY_IMAGE_FALLBACK_BYTES,
  }));
}
