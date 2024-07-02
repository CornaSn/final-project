'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ErrorMessage from '../../ErrorMessage';
import { RegisterResponseBodyPost } from '../api/register/route';

export default function RegisterForm() {
  const [role, setRole] = useState('member');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const expert = 'expert';
  const member = 'member';
  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        role,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: RegisterResponseBodyPost = await response.json();
    console.log('RegisterResponseData', data);

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(`/profile/${data.user.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={async (event) => await handleRegister(event)}>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded shadow-md space-y-4">
          <h1 className="text-2xl font-bold text-center mb-6">Registration</h1>
          <label htmlFor="shotFirst" className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">
              Please choose:
            </span>
            <select
              id="shotFirst"
              className="select select-bordered grow"
              value={role}
              onChange={(event) => setRole(event.currentTarget.value)}
            >
              <option>Select</option>
              <option value={expert}>I am NOT an expert</option>
              <option value={member}>I am an expert</option>
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">Email:</span>
            <input
              className="input input-bordered grow"
              placeholder="Email"
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">
              First name:
            </span>
            <input
              className="input input-bordered grow"
              placeholder="First name"
              onChange={(event) => setFirstName(event.currentTarget.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">
              Last name:
            </span>
            <input
              className="input input-bordered grow"
              placeholder="Last name"
              onChange={(event) => setLastName(event.currentTarget.value)}
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
          <div className="flex flex-col gap-1">
            {' '}
            <button className="btn">Register</button>
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
