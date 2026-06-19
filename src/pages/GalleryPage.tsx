import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { GalleryToolbar } from '../components/gallery/GalleryToolbar';
import { Pagination } from '../components/gallery/Pagination';
import { PetGrid } from '../components/gallery/PetGrid';
import { SelectionBar } from '../components/selection/SelectionBar';
import { Spinner } from '../components/ui/Spinner';
import { StateMessage } from '../components/ui/StateMessage';
import { useSelection } from '../context/SelectionContext';
import { usePets } from '../hooks/usePets';
import { filterPets } from '../utils/filterPets';
import { sortPets, type SortOption } from '../utils/sortPets';


const PageTitle = styled.h1`
margin: 0 0 0.35rem;
font-size: clamp(1.6rem, 3vw, 2rem);
`;

const Subtitle = styled.p`
margin: 0 0 1.5rem;
color: ${({ theme }) => theme.colors.textMuted};
`;

const Spacer = styled.div`
height: 5rem;
`;

const PAGE_SIZE = 12;

export function GalleryPage() {
  const { pets, status, error, refetch } = usePets(); 
  const { selectAll, clearSelection } = useSelection();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date-newest');
  const [page, setPage] = useState(1);



  // preventing unnecessary re-renders
  const processedPets = useMemo(() => { 
    return sortPets(filterPets(pets, search), sortBy);
  }, [pets, search, sortBy]); // filter + sort runs only when pets, search, or sortBy changes

  const totalPages = Math.max(1, Math.ceil(processedPets.length / PAGE_SIZE));

  const paginatedPets = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return processedPets.slice(start, start + PAGE_SIZE);
  }, [processedPets, page]);

  useEffect(() => {
    setPage(1);
  }, [search, sortBy]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]); // dependency arrays are fixed, so we don't need to use useCallback

  if (status === 'loading' || status === 'idle') {
    return <Spinner aria-label="Loading pets" />;
  }

  if (status === 'error') {
    return (
      <StateMessage
        title="Could not load pets"
        message={error ?? 'Please try again.'}
        actionLabel="Retry"
        onAction={refetch}
      />
    );
  }

  if (status === 'empty') {
    return (
      <StateMessage
        title="No pets found"
        message="The gallery is empty right now."
        actionLabel="Refresh"
        onAction={refetch}
      />
    );
  }

  return (
    <>
      <PageTitle>Pet Gallery</PageTitle>
      <Subtitle>Browse, search, and download your favorite companions.</Subtitle>

      <GalleryToolbar
        search={search}
        sortBy={sortBy}
        onSearchChange={setSearch}
        onSortChange={setSortBy}
        onSelectAll={() => selectAll(processedPets)}
        onClearSelection={clearSelection}
      />

      {paginatedPets.length === 0 ? (
        <StateMessage
          title="No matches"
          message="Try a different search term or clear the filter."
        />
      ) : (
        <PetGrid pets={paginatedPets} />
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrevious={() => setPage((current) => Math.max(1, current - 1))}
        onNext={() => setPage((current) => Math.min(totalPages, current + 1))}
      />

      <SelectionBar pets={pets} />
      <Spacer />
    </>
  );
}
