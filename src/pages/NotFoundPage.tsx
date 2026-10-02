import { Button, Container, Stack, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <Container size="sm" py="xl">
      <Stack align="flex-start">
        <Title>Page not found</Title>
        <Text c="dimmed">The page you requested does not exist.</Text>
        <Button component={Link} to="/">
          Choose a team
        </Button>
      </Stack>
    </Container>
  );
}
