import React, { useState } from 'react';
import { Navbar } from '../../Components/Candidate/Navbar';
import axios from 'axios';
import { data } from 'autoprefixer';
export const Signin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission and page reload
    if (email === '' || password === '') {
      console.log('Please fill all the fields');
    } else {
      axios.post('api/users/sigin', { email, password })
      .then(res => {
        console.log(res.data)
        if (res.data) {
          localStorage.setItem("jwt",res.data.token)
          localStorage.setItem("user",JSON.stringify(res.data.user))
          window.location.href = '/';
        } else {
          console.log('Invalid email or password');
        }
      
      })
      
          
         
      
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full py-6 px-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mb-3 border "
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mb-3 border rounded-md"
              />
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
                Login
              </button>
            </div>
          </form>
          <p className="mt-4 text-center">
            New user? <a href="/signup" className="text-blue-500">Sign up</a>
          </p>
          <p className="mt-2 text-center">
            <a href="/forgotpassword" className="text-blue-500">Forgot Password?</a>
          </p>
        </div>
      </div>
    </div>
  );
};
