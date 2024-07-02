'use client';

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
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: LoginResponseBodyPost = await response.json();
    console.log('LoginResponseBodyDATA', data);

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(`/profile/${data.user.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={async (event) => await handleLogin(event)}>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
              Retyype your password:
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
          <div className="flex flex-col gap-1">
            {' '}
            <button className="btn">Login</button>
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
