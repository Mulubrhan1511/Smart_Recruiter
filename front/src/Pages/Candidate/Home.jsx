import React from 'react';
import img1 from "../../assets/banner.png";
import { Navbar } from '../../Components/Candidate/Navbar';
export const Home = () => {
  return (
    <div className='relative w-full h-screen'>
      <Navbar />
      <div className='relative h-full'> {/* Increase the height to 3/5 of the screen */}
        <img src={img1} alt='Banner' className='w-full h-full object-cover' />
        <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
        <h1 className='text-5xl font-extrabold text-brown mb-4'>Welcome to IE Network Candidate Home Page</h1>
          <p className='text-lg text-brown mb-8'>This is a platform for candidates to find jobs and apply for them</p>
        </div>
      </div>
      
      {/* Additional Section Below Banner */}
      <div className='bg-gray-100 py-8 px-4 text-center'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold mb-6'>About SmartRecruit</h2>
          <p className='text-lg mb-8 text-gray-700'>
            SmartRecruit is a web-based application designed to streamline the recruitment process for HR professionals. It provides a comprehensive dashboard to track job applications, automate email notifications, and generate basic reports.
          </p>
          
          <h2 className='text-3xl font-bold mb-6'>Key Features</h2>
          <ul className='text-lg mb-8 text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4'>
  <li className="flex items-center">
    <svg className="w-6 h-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <span>Job Posting and Application Submission</span>
  </li>
  <li className="flex items-center">
    <svg className="w-6 h-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <span>Application Management</span>
  </li>
  <li className="flex items-center">
    <svg className="w-6 h-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <span>Application Status Tracking</span>
  </li>
  <li className="flex items-center">
    <svg className="w-6 h-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <span>Email Notifications</span>
  </li>
  <li className="flex items-center">
    <svg className="w-6 h-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <span>Basic Reporting</span>
  </li>
  <li className="flex items-center">
    <svg className="w-6 h-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <span>Application Sorting</span>
  </li>
  <li className="flex items-center">
    <svg className="w-6 h-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <span>Application Duplication Prevention</span>
  </li>
  <li className="flex items-center">
    <svg className="w-6 h-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <span>User Authentication</span>
  </li>
  <li className="flex items-center">
    <svg className="w-6 h-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <span>Responsive Design</span>
  </li>
  <li className="flex items-center">
    <svg className="w-6 h-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <span>User-Friendly Interface</span>
  </li>
</ul>

          
          <p className='text-lg text-gray-700'>
            Experience the convenience and efficiency of SmartRecruit for your recruitment needs.
          </p>
        </div>
      </div>
    </div>
  );
}


