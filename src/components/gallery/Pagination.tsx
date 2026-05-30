import styled from 'styled-components';
import { Button } from '../ui/Button';

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
`;

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function Pagination({ page, totalPages, onPrevious, onNext }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <Row>
      <Button type="button" $variant="secondary" onClick={onPrevious} disabled={page <= 1}>
        Previous
      </Button>
      <Info>Page {page} of {totalPages}</Info>
      <Button type="button" $variant="secondary" onClick={onNext} disabled={page >= totalPages}>
        Next
      </Button>
    </Row>
  );
}
