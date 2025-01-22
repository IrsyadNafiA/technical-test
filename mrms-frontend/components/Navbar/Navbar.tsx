'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { IconClipboardList, IconDashboard, IconLogout2 } from '@tabler/icons-react';
import { Divider, Flex, Group, NavLink, Title } from '@mantine/core';
import { useAuthStore } from '@/store/useAuthStore';
import classes from './Navbar.module.css';

const data = [
  {
    link: '/dashboard',
    label: 'Dashboard',
    icon: IconDashboard,
  },
  {
    link: '/dashboard/material-requests',
    label: 'Material Requests',
    icon: IconClipboardList,
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const { token, isInitialized, initializeAuth, removeToken } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (isInitialized && !token) {
      router.push('/auth/login');
    }
  }, [token, router, isInitialized]);

  const handleLogout = () => {
    removeToken();
    router.push('/auth/login');
  };

  const links = data.map((item, index) => (
    <NavLink
      key={index}
      classNames={{
        root: `${classes.link} ${pathname === item.link ? classes.linkActive : ''}`,
      }}
      href={item.link}
      label={item.label}
      leftSection={<item.icon size={16} stroke={1.5} />}
      variant="light"
    />
  ));

  return (
    <>
      <Group>
        <Title order={3}>MRMS</Title>
      </Group>
      <Divider size={2} my={'md'} />
      <Flex direction={'column'} gap={'xs'}>
        {links}
      </Flex>
      <Divider size={2} my={'md'} />
      <NavLink
        href="#"
        className={classes.link}
        label="Logout"
        variant="light"
        leftSection={<IconLogout2 size={16} stroke={1.5} />}
        onClick={handleLogout}
      />
    </>
  );
};

export default Navbar;
