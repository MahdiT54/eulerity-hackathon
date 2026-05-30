import styled from 'styled-components';
import { media } from '../../styles/breakpoints';
import type { Pet } from '../../types/pet';
import { PetCard } from './PetCard';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.desktop} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

interface PetGridProps {
  pets: Pet[];
}

export function PetGrid({ pets }: PetGridProps) {
  return (
    <Grid>
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </Grid>
  );
}
