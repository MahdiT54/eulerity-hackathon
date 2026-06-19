import { useCallback, useEffect, useState } from 'react';
import { fetchPets } from '../api/pets';
import type { Pet } from '../types/pet';

export type PetsStatus = 'idle' | 'loading' | 'success' | 'error' | 'empty';

interface UsePetsResult {
  pets: Pet[];
  status: PetsStatus;
  error: string | null;
  refetch: () => void;
}

/** Loads pets from /pets and exposes explicit loading, error, and empty states. */
export function usePets(): UsePetsResult { 
  const [pets, setPets] = useState<Pet[]>([]);
  const [status, setStatus] = useState<PetsStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => {
    setReloadKey((key) => key + 1);
  }, []); 

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus('loading');
      setError(null);

      try {
        const data = await fetchPets(); // fetch the pets from the api
        if (cancelled) return;

        if (data.length === 0) {
          setPets([]);
          setStatus('empty');
          return;
        }

        setPets(data); // set the pets state to the data
        setStatus('success');
      } catch (err) {
        if (cancelled) return;
        setPets([]);
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Something went wrong');
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  return { pets, status, error, refetch };
}
