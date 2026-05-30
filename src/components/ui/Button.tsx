import styled, { css } from 'styled-components';

const variants = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    &:hover:not(:disabled) { background: ${({ theme }) => theme.colors.primaryHover}; }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};
    &:hover:not(:disabled) { border-color: ${({ theme }) => theme.colors.primary}; }
  `,
};

export const Button = styled.button<{ $variant?: keyof typeof variants }>`
  padding: 0.6rem 1rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  font-weight: 600;
  transition: background 0.15s ease, border-color 0.15s ease;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  ${({ $variant = 'primary' }) => variants[$variant]}
`;
