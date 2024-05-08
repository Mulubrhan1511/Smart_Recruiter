import React, { useState } from 'react';
import axios from 'axios';
export const Verfication = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
    event.preventDefault();

    if (verificationCode.length !== 6) {
      setError('Invalid verification code');
      return;
    }
    // Add your verification logic here, e.g., sending the code to the server for validation
    axios.post('api/users/verify', { verificationCode, id: user._id },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(respones=>{
        if(respones.data){
            localStorage.setItem('user', JSON.stringify({ ...user, verified: true }));
            window.location.href = '/';
        } else {
            setError('Invalid verification code');
        }
        
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl mb-4">Verification</h2>
        <p className="text-gray-700 mb-6">
          Please enter the 6-digit verification code sent to your phone number.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 mb-4 "
            maxLength={6}
            required
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
