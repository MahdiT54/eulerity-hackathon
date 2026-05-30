import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Spinner } from '../components/ui/Spinner';
import { StateMessage } from '../components/ui/StateMessage';
import { useSelection } from '../context/SelectionContext';
import { usePets } from '../hooks/usePets';
import { formatBytes } from '../utils/formatBytes';
import { Button } from '../components/ui/Button';

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

const Layout = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
`;

const Image = styled.img`
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const Title = styled.h1`
  margin: 0 0 0.75rem;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;
`;

const Meta = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const CheckboxRow = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
  cursor: pointer;
`;

export function PetDetailPage() {
  const { id } = useParams();
  const { pets, status, error, refetch } = usePets();
  const { isSelected, toggleSelection } = useSelection();

  if (status === 'loading' || status === 'idle') {
    return <Spinner aria-label="Loading pet details" />;
  }

  if (status === 'error') {
    return (
      <StateMessage
        title="Could not load pet"
        message={error ?? 'Please try again.'}
        actionLabel="Retry"
        onAction={refetch}
      />
    );
  }

  const pet = pets.find((item) => item.id === id);

  if (!pet) {
    return (
      <>
        <StateMessage
          title="Pet not found"
          message="This pet may have been removed from the gallery."
        />
        <BackLink to="/">&larr; Back to gallery</BackLink>
      </>
    );
  }

  const createdDate = new Date(pet.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <BackLink to="/">&larr; Back to gallery</BackLink>
      <Layout>
        <Image src={pet.imageUrl} alt={pet.title} />
        <div>
          <Title>{pet.title}</Title>
          <Meta>Added {createdDate} � {formatBytes(pet.fileSizeBytes)}</Meta>
          <Description>{pet.description}</Description>
          <CheckboxRow>
            <input
              type="checkbox"
              checked={isSelected(pet.id)}
              onChange={() => toggleSelection(pet.id)}
            />
            Include in selection
          </CheckboxRow>
          <Button as={Link} to="/" $variant="secondary">Return to gallery</Button>
        </div>
      </Layout>
    </>
  );
}
