// ForgotPassword.js
import React, { useState } from 'react';

import axios from 'axios';
import PasswordResetConfirmation from './PasswordResetConfirmation'; // Import the confirmation page

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [resetInitiated, setResetInitiated] = useState(false); // State to track if password reset is initiated
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/users/forgot-password', { email });
      console.log(response.data); // Assuming response contains success message or email

      // Set the resetInitiated state to true
      setResetInitiated(true);
    } catch (error) {
      setMessage('');
      setError('Failed to initiate password reset. Please try again.');
    }
  };

  return (
    <div>
      {resetInitiated ? ( // If password reset is initiated, render the confirmation page
        <PasswordResetConfirmation email={email} />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full py-6 px-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
            {message && <p className="text-green-600">{message}</p>}
            {error && <p className="text-red-600">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 mb-3 border"
                />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
