'use client';

import { useEffect, useState } from 'react';
import { Loader } from '@mantine/core';
import { useAuthStore } from '@/store/useAuthStore';
import { useUserStore } from '@/store/userStore';

const Dashboard = () => {
  const { token } = useAuthStore();
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token, fetchUser]);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <p>User ID: {user.id}</p>
          <p>User Name: {user.name}</p>
          <p>User Department: {user.department}</p>
        </div>
      ) : (
        <Loader color="blue" size="lg" />
      )}
    </div>
  );
};

export default Dashboard;
