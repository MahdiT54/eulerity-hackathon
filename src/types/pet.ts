/** Raw record returned by GET /pets */
export interface PetApiRecord {
  title: string;
  description: string;
  url: string;
  created: string;
}

/** Normalized pet used throughout the app */
export interface Pet {
  id: string;
  title: string;
  description: string;
  url: string;
  created: string;
  fileSizeBytes: number;
}
