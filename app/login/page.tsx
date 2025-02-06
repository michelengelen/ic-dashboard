'use client';
import React from 'react';
import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => signIn('github')}>Login with GitHub</button>
    </div>
  );
}
