import React, { useState } from 'react';
import axios from 'axios';
import { Navbar } from '../../Components/Candidate/Navbar';
export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState('');

  const signup = (event) => {
    event.preventDefault(); 
    if (email === '' || password === '' || name === '') {
      setError('Please fill in all fields');
    } else {
      axios.post('api/users', { name, email, password })
  .then(response => {
    if (response.data) {
      setError('');
      setSuccess('User created successfully');
    }
    else{
      setSuccess('');
      setError('User With this email already exists');
    }
    
  })
  .catch(error => {
    if (error) {
      setError('Email already exists');
    } 
  });





    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full py-6 px-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <form onSubmit={signup}>
          {error && <p className="text-center text-red-500">{error}</p>}
          {success && <p className="text-center text-green-500">{success}</p>}

            <input
              type="text"
              placeholder="Name"
              className="w-full px-3 py-2 mb-3 border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 mb-3 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 mb-3 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an account? <a href="/login" className="text-blue-500">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};
