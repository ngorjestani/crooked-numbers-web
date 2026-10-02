import { Alert, Center, Loader, Stack, Text } from '@mantine/core';
import type { ReactNode } from 'react';

interface QueryStateProps {
  isPending: boolean;
  error: Error | null;
  isEmpty?: boolean;
  emptyMessage?: string;
  children: ReactNode;
}

export function QueryState({
  isPending,
  error,
  isEmpty = false,
  emptyMessage = 'No data is available.',
  children,
}: QueryStateProps) {
  if (isPending) {
    return (
      <Center py="xl" role="status" aria-label="Loading">
        <Stack align="center" gap="xs">
          <Loader size="sm" />
          <Text c="dimmed" size="sm">
            Loading data…
          </Text>
        </Stack>
      </Center>
    );
  }

  if (error) {
    return (
      <Alert color="red" title="Unable to load data">
        {error.message}
      </Alert>
    );
  }

  if (isEmpty) {
    return (
      <Alert color="gray" title="Nothing to show">
        {emptyMessage}
      </Alert>
    );
  }

  return children;
}
