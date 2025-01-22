'use client';

import { useRouter } from 'next/navigation';
import { yupResolver } from 'mantine-form-yup-resolver';
import * as yup from 'yup';
import {
  Button,
  Center,
  Container,
  Flex,
  Group,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuthStore } from '@/store/useAuthStore';
import axiosInstance from '@/utils/axiosInstance';

const Login = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const router = useRouter();

  const loginSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
  });

  const loginForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: yupResolver(loginSchema),
  });

  const handleSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await axiosInstance.post('/auth/login', data, {
        withCredentials: true,
      });
      const { token } = response.data;

      setToken(token);
      localStorage.setItem('token', token);
      router.push('/dashboard');
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Container size={420} my={40}>
      <Center my={'xl'}>
        <Title order={3}>Login to your account</Title>
      </Center>
      <form onSubmit={loginForm.onSubmit(handleSubmit)}>
        <Flex direction="column" gap={'md'}>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            key={loginForm.key('email')}
            {...loginForm.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            key={loginForm.key('password')}
            {...loginForm.getInputProps('password')}
          />
        </Flex>
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Container>
  );
};

export default Login;
