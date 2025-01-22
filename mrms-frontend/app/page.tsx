'use client';

import { useRouter } from 'next/navigation';
import { Button, Center } from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <Welcome />
      <Center>
        <Button onClick={() => router.push('/auth/login')}>Login</Button>
      </Center>
      {/* <ColorSchemeToggle /> */}
    </>
  );
}
