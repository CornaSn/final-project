'use client';

import { useState } from 'react';

export default function RegisterForm() {
  const [role, setRole] = useState('Member');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const expert = 'expert';
  const member = 'member';

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
    const data = await response.json();

    console.log('data', data);
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
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
      </label>

      <label>
        Last name
        <input
          value={lastName}
          onChange={(event) => setLastName(event.currentTarget.value)}
        />
      </label>

      <label>
        E-mail
        <input
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
      </label>

      <label>
        Password
        <input
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <button>Register</button>
    </form>
  );
}
