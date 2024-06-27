'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ErrorMessage from '../../../app/ErrorMessage';
import { RegisterResponseBodyPost } from '../api/register/route';

export default function RegisterForm() {
  const [role, setRole] = useState('Member');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: RegisterResponseBodyPost = await response.json();
    // console.log('data', data);

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    // router.push(`/profile/${data.user.firstName}`);
    router.refresh();
  }

  return (
    <form onSubmit={async (event) => await handleRegister(event)}>
      <h1>Registration Form </h1>
      <label>
        Please choose:
        <select
          id="role"
          value={role}
          onChange={(event) => setRole(event.currentTarget.value)}
        >
          <option value={member}>I am looking for an expert</option>
          <option value={expert}>I am an expert</option>
        </select>
      </label>

      <label>
        First name
        <input
          value={firstName}
          placeholder="First name"
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
      </label>

      <label>
        Last name
        <input
          value={lastName}
          placeholder="Last name"
          onChange={(event) => setLastName(event.currentTarget.value)}
        />
      </label>

      <label>
        E-mail
        <input
          value={email}
          type="email"
          placeholder="your@email.com"
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
      </label>

      <label>
        Password
        <input
          value={password}
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <button>Register</button>
      {errors.map((error) => (
        <div className="error" key={`error-${error.message}`}>
          <div className="text-lg text-red-600">
            <ErrorMessage>{error.message}</ErrorMessage>
          </div>
        </div>
      ))}
    </form>
  );
}
