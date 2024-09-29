// app/test-api/page.js

'use client';  // Enable client-side rendering

import { useState } from 'react';

export default function TestApiPage() {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://api-data-0zm4.onrender.com/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Test API Call to localhost:3001/api/users</h1>
      <button onClick={fetchUsers}>Fetch Users</button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <pre>{users ? JSON.stringify(users, null, 2) : 'No data yet'}</pre>
    </div>
  );
}