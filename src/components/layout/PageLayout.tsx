import styled from 'styled-components';
import { Header } from './Header';

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.page};
  min-height: calc(100vh - 72px);
`;

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
}
