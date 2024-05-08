import React, { useState, useEffect } from 'react';
import { Sidebar2 } from "../../Components/Candidate/Sidebar2";
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../features/jobSlice';
import { Navbar } from '../../Components/Candidate/Navbar';

export const Jobs = () => {
  const jobs = useSelector(state => state.jobs.jobs);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const filteredJobs = useSelector(state => state.jobs.filteredJobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  return (
    <div className='relative w-full h-screen'>
      <Navbar />
      <div className="relative container  top-16">

      
      <div className="flex-1">
      <div className='z-30'>
        <Sidebar2 />
      </div>
      
      <div className='flex-1  left-0 py-8  lg:px-72'>
      {filteredJobs.map(job => (
        
  <a href={'/detailjob/' + job._id} key={job._id}>
    <div className="bg-white shadow-md p-4 rounded-lg mb-4 flex items-center justify-between">
      <div>
        
        <h2 className="text-xl font-bold mb-2">{job.title}</h2>
        <p className="text-gray-600 mb-2">{job.company} - {job.location}</p>
        <p className="text-sm text-gray-700">{job.description}</p>
      </div>
      {user && (
  job.applicants.map(applicant => (
    user._id === applicant.user && (
      <span key={applicant._id} className="bg-blue-500 text-white px-2 py-1 rounded-md">Applied</span>
    )
  ))
)}


      
      
    </div>
  </a>
))}




        </div>
      
    </div>
    </div>
    </div>
  );
};
