// src/components/TestSupabaseConnection.js

import { useEffect, useState } from 'react';
import supabase from '../api/supabaseClient';

const TestSupabaseConnection = () => {
    const [status, setStatus] = useState('Checking connection...');
  
    useEffect(() => {
      const testConnection = async () => {
        // A simple query to test if the connection works
        const { data, error } = await supabase.rpc('version'); // Using PostgreSQL's 'version()' function as a test
  
        if (error) {
          setStatus('Connection failed: ' + error.message);
        } else {
          setStatus('Connection successful!');
        }
      };
  
      testConnection();
    }, []);
  
    return <div>{status}</div>;
  };

export default TestSupabaseConnection;