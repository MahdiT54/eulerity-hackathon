import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelection } from '../../context/SelectionContext';
import type { Pet } from '../../types/pet';

const Card = styled.article<{ $selected: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 2px solid ${({ theme, $selected }) => ($selected ? theme.colors.accent : 'transparent')};
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }
`;

const ImageWrap = styled.div`
  position: relative;
  aspect-ratio: 3 / 2;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CheckboxLabel = styled.label`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: rgba(255, 255, 255, 0.92);
  padding: 0.35rem 0.5rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  cursor: pointer;
`;

const Body = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  margin: 0 0 0.35rem;
  font-size: 1.1rem;
`;

const Description = styled.p`
  margin: 0 0 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const DetailLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

interface PetCardProps {
  pet: Pet;
}

export function PetCard({ pet }: PetCardProps) { // destructure the pet object from the props
  const { isSelected, toggleSelection } = useSelection();
  const selected = isSelected(pet.id);

  return (
    <Card $selected={selected}>
      <ImageWrap>
        <Image src={pet.url} alt={pet.title} loading="lazy" />
        <CheckboxLabel>
          <input
            type="checkbox"
            checked={selected}
            onChange={() => toggleSelection(pet.id)}
            aria-label={`Select ${pet.title}`}
          />
          Select
        </CheckboxLabel>
      </ImageWrap>
      <Body>
        <Title>{pet.title}</Title>
        <Description>{pet.description}</Description>
        <DetailLink to={`/pets/${pet.id}`}>View details</DetailLink>
      </Body>
    </Card>
  );
}
