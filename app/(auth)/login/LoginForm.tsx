'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ErrorMessage from '../../ErrorMessage';
import { LoginResponseBodyPost } from '../api/login/route';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const router = useRouter();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        confirmPassword,
        firstName: 'not necessary',
        lastName: 'not necessary',
        role: '',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: LoginResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push('/');
    router.refresh();
  }

  return (
    <form onSubmit={async (event) => await handleLogin(event)}>
      <div className="flex justify-center items-center min-h-screen bg-base-200 mt-8">
        <div className="w-full max-w-md p-6 bg-white rounded shadow-md space-y-4">
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">Email:</span>
            <input
              className="input input-bordered grow"
              placeholder="Email"
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">Password:</span>
            <input
              className="input input-bordered grow"
              placeholder="Password"
              type="password"
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">
              Retype your password:
            </span>
            <input
              className="input input-bordered grow"
              placeholder="Retype your password"
              type="password"
              onChange={(event) =>
                setConfirmPassword(event.currentTarget.value)
              }
            />
          </label>
          <div className="flex justify-between">
            <Link
              href="/login"
              className="label label-text-alt link link-hover"
            >
              Forgot password?
            </Link>

            <Link
              href="/register"
              className="label label-text-alt link link-hover"
            >
              No Account yet? Register{' '}
            </Link>
          </div>
          <div className="flex flex-col gap-1">
            {' '}
            <button className="btn bg-primary">Login</button>
            {errors.map((error) => (
              <div className="error" key={`error-${error.message}`}>
                <div className="text-lg text-red-600">
                  <ErrorMessage>{error.message}</ErrorMessage>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
