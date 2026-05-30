import styled from 'styled-components';
import type { SortOption } from '../../utils/sortPets';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { media } from '../../styles/breakpoints';

const Toolbar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-bottom: 1.5rem;

  ${media.tablet} {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }
`;

const SearchWrap = styled.div`
  flex: 1 1 220px;
`;

const ControlGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

interface GalleryToolbarProps {
  search: string;
  sortBy: SortOption;
  onSearchChange: (value: string) => void;
  onSortChange: (value: SortOption) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
}

export function GalleryToolbar({
  search,
  sortBy,
  onSearchChange,
  onSortChange,
  onSelectAll,
  onClearSelection,
}: GalleryToolbarProps) {
  return (
    <Toolbar>
      <SearchWrap>
        <Label htmlFor="pet-search">Search pets</Label>
        <Input
          id="pet-search"
          type="search"
          placeholder="Search by title or description"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </SearchWrap>
      <ControlGroup>
        <Label htmlFor="pet-sort">
          Sort by
          <Select
            id="pet-sort"
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
          >
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="date-newest">Date (Newest First)</option>
            <option value="date-oldest">Date (Oldest First)</option>
          </Select>
        </Label>
        <Button type="button" $variant="secondary" onClick={onSelectAll}>Select All</Button>
        <Button type="button" $variant="secondary" onClick={onClearSelection}>Clear Selection</Button>
      </ControlGroup>
    </Toolbar>
  );
}
