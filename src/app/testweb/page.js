// src/App.js (or your main component)
"use client"; // Assuming you're using Next.js or a similar framework

import React, { useState, useEffect } from 'react';
import {getData} from '../api/fetchDatabase'; // Import the function to fetch data

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const data = await getData();  // Fetch the data
      setUsers(data);  // Update the state with the fetched data
    }

    getUsers();  // Call the function to fetch users
  }, []);  // Empty dependency array to fetch only once on mount

  return (
    <div className="App">
      <h1>User List</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.username} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;