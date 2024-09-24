import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProtectedPage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/protected', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setMessage(res.data.message))
    .catch(() => setMessage('Access denied'));
  }, []);

  return (
    <div>
      <h2>Protected Page</h2>
      <p>{message}</p>
    </div>
  );
};

export default ProtectedPage;