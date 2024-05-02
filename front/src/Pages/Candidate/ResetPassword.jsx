import React, { useState } from 'react';
import axios from 'axios';

export const ResetPassword = ({ email }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        
        try {
            axios.post('/api/users/resetpassword', { email, password })
            .then(res => {
                if (res.data) {

                    window.location.href = '/login';
                } else {
                    console.log('Invalid email or password')
                }
            
            })
            
        } catch (error) {
            setMessage('');
            console.log(error)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
    <div className="max-w-md w-full py-6 px-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 mb-3 border"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 mb-3 border"
                />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
                    Reset Password
                </button>
            </div>
        </form>
    </div>
</div>

    );
};

