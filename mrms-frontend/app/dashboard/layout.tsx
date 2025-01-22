'use client';

import { ReactNode } from 'react';
import { AppShell, Burger, Group, Title, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Navbar from '@/components/Navbar/Navbar';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();
  const theme = useMantineTheme();

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
    >
      <AppShell.Header>
        <Group
          justify="flex-start"
          h={60}
          px={18}
          style={{ backgroundColor: theme.colors.indigo[6], color: 'white' }}
        >
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="md"
            size="md"
            color="white"
            lineSize={3}
          />
          <Title order={2}>MRMS</Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" style={{ backgroundColor: theme.colors.indigo[6], color: 'white' }}>
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default DashboardLayout;
