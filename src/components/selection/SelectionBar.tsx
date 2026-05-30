import { useState } from 'react';
import styled from 'styled-components';
import { useSelection } from '../../context/SelectionContext';
import type { Pet } from '../../types/pet';
import { downloadSelectedPets } from '../../utils/downloadImages';
import { formatBytes } from '../../utils/formatBytes';
import { Button } from '../ui/Button';

const Bar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.bar};
  padding: 0.85rem ${({ theme }) => theme.spacing.page};
  z-index: 20;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  justify-content: space-between;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  font-size: 0.95rem;
`;

const Muted = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
`;

interface SelectionBarProps {
  pets: Pet[];
}

export function SelectionBar({ pets }: SelectionBarProps) {
  const { selectedCount, getSelectedPets, getEstimatedSize } = useSelection();
  const [downloading, setDownloading] = useState(false);

  if (selectedCount === 0) return null;

  const selectedPets = getSelectedPets(pets);
  const estimatedSize = getEstimatedSize(pets);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadSelectedPets(selectedPets);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Bar>
      <Inner>
        <Meta>
          <strong>{selectedCount} item{selectedCount === 1 ? '' : 's'} selected</strong>
          <Muted>Estimated total size: {formatBytes(estimatedSize)}</Muted>
        </Meta>
        <Button type="button" onClick={handleDownload} disabled={downloading}>
          {downloading ? 'Downloading...' : 'Download Selected'}
        </Button>
      </Inner>
    </Bar>
  );
}
