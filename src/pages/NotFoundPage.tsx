import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StateMessage } from '../components/ui/StateMessage';

const HomeLink = styled(Link)`
  display: inline-block;
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

export function NotFoundPage() {
  return (
    <>
      <StateMessage
        title="Page not found"
        message="The page you are looking for does not exist."
      />
      <div style={{ textAlign: 'center' }}>
        <HomeLink to="/">Go home</HomeLink>
      </div>
    </>
  );
}
