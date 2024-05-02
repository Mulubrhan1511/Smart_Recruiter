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
      <div className=' w-full bg-white py-4 text-center'>
        <h2 className='text-2xl font-bold text-black'>About Us</h2>
        <p className='text-lg text-black'>IE Networks is a fully Ethiopian owned Company that focuses on value maximizing and is a service oriented solution provider, established in December 2008.</p>
<p className='text-lg text-black'>

We has been involved exclusively in the areas ranging from enterprise network services and business automation intelligence to smart infrastructure and cloud services.</p>
        
      </div>
    </div>
  );
}


