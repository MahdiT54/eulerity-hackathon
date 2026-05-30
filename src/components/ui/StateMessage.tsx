import styled from 'styled-components';
import { Button } from './Button';

const Wrapper = styled.div`
  text-align: center;
  padding: 3rem 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const Title = styled.h2`
  margin: 0 0 0.5rem;
  font-size: 1.35rem;
`;

const Text = styled.p`
  margin: 0 0 1.25rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

interface StateMessageProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function StateMessage({ title, message, actionLabel, onAction }: StateMessageProps) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Text>{message}</Text>
      {actionLabel && onAction ? (
        <Button type="button" onClick={onAction}>{actionLabel}</Button>
      ) : null}
    </Wrapper>
  );
}
