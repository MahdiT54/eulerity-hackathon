import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useSelection } from '../../context/SelectionContext';
import { media } from '../../styles/breakpoints';

const Bar = styled.header`
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem ${({ theme }) => theme.spacing.page};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Logo = styled(NavLink)`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const StyledLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 500;
  padding-bottom: 0.15rem;
  border-bottom: 2px solid transparent;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    border-bottom-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Badge = styled.span`
  background: ${({ theme }) => theme.colors.selected};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;

  ${media.tablet} {
    display: inline;
  }
`;

export function Header() {
  const { selectedCount } = useSelection();

  return (
    <Bar>
      <Inner>
        <Logo to="/">Pet Gallery</Logo>
        <Nav>
          <StyledLink to="/" end>Gallery</StyledLink>
          <StyledLink to="/about">About</StyledLink>
          {selectedCount > 0 ? <Badge>{selectedCount} selected</Badge> : null}
        </Nav>
      </Inner>
    </Bar>
  );
}
