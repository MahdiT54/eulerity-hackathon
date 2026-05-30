import styled from 'styled-components';

const Title = styled.h1`
  margin: 0 0 1rem;
`;

const Section = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.card};
  max-width: 720px;
`;

const Paragraph = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`;

const List = styled.ul`
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`;

export function AboutPage() {
  return (
    <>
      <Title>About Me</Title>
      <Section>
        <Paragraph>
          Hi, I am Mahdi. I built this pet gallery as part of the Eulerity front-end take-home.
          I focused on a clean browsing experience with search, sorting, pagination, and multi-select downloads.
        </Paragraph>
        <Paragraph>This project uses:</Paragraph>
        <List>
          <li>React and TypeScript</li>
          <li>styled-components for layout and theming</li>
          <li>react-router-dom for gallery and detail routes</li>
          <li>A custom data hook with explicit loading, error, and empty states</li>
        </List>
      </Section>
    </>
  );
}
