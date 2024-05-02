import React, { useState } from 'react';
import axios from 'axios';
import { Navbar } from '../../Components/Candidate/Navbar';
import { ResetPassword } from './ResetPassword'; // Import ResetPassword component

const PasswordResetConfirmation = ({ email }) => {
    const [verification, setVerification] = useState('');
    const [resetInitiated, setResetInitiated] = useState(false);
    const [error, setError] = useState('');

    const checkVerification = () => {
        axios.post('/api/users/checkverfication', {email, code:verification})
        .then(res => {
            if(res.data){
                setResetInitiated(true)
            }
            else{
                setError('Invalid verification code')
            }
        })
    }

    return (
        <>
            {resetInitiated ? ( // If password reset is initiated, render the ResetPassword component
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
