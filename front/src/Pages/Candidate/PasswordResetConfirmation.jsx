import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from '../../Components/Candidate/Navbar';
import { ResetPassword } from './ResetPassword';

const PasswordResetConfirmation = ({ email }) => {
    const [verification, setVerification] = useState('');
    const [resetInitiated, setResetInitiated] = useState(false);
    const [error, setError] = useState('');
    const [countdown, setCountdown] = useState(120); 

    useEffect(() => {
        
        const timer = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);

        
        return () => clearInterval(timer);
    }, []);

    const checkVerification = () => {
        const token = localStorage.getItem('jwt');
        axios.post('/api/users/checkverfication', { email, code: verification }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            if (res.data) {
                setResetInitiated(true);
            } else {
                setError('Invalid verification code');
            }
        });
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <>
            {resetInitiated ? (
                <ResetPassword email={email} />
            ) : (
                <div>
                    <Navbar />
                    <div className="min-h-screen flex items-center justify-center bg-gray-50">
                        <div className="max-w-md w-full py-6 px-4 bg-white shadow-lg rounded-lg">
                            <h2 className="text-2xl font-bold mb-4">Password Reset Confirmation</h2>
                            <p>An email with instructions to reset your password has been sent to:</p>
                            <p className="text-blue-500">{email}</p>
                            <p>Please insert the verification code here:</p>
                            {
                                error && <p className="text-red-500">{error}</p>
                            }
                            <div>
                            <div className="mt-4 text-gray-600">
                                    {countdown > 0 ? (
                                        <>
                                            <p>Time left to enter verification code:</p>
                                            <div className="flex items-center justify-center mt-2">
                                                <div className="bg-gray-200 p-2 rounded-md flex items-center">
                                                    
                                                    <span className="text-lg font-semibold">{formatTime(countdown)}</span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <p className='text-red-600'>Verification code has expired.</p>
                                    )}
                                </div>

                                <input
                                    type="text"
                                    placeholder="Enter verification code"
                                    value={verification}
                                    onChange={(e) => setVerification(e.target.value)}
                                    className="w-full px-3 py-2 mb-3 border"
                                />
                                <button type="button" className="w-full bg-blue-500 text-white py-2 rounded-md" onClick={checkVerification}>
                                    Verify and Reset Password
                                </button>
                               
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PasswordResetConfirmation;
