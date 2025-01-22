import { Anchor } from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <Anchor variant='link' href='/auth/login'>Login</Anchor>
      <ColorSchemeToggle />
    </>
  );
}
