import React from 'react';

export default function Register() {
  return (
    <div>
      <h1>Register</h1>
      <form method="POST" action="/api/register">
        <input type="email" name="email" placeholder="Email" required/>
        <input type="password" name="password" placeholder="Password" required/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
