import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../Components/Hr/Sidebar';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const HrApplicantDetails = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const { userId, jobId } = useParams();
  const [job, setJob] = useState({});
  const [applicant, setApplicant] = useState({});
  const [status, setStatus] = useState('pending');
  const [applicantdetail, setApplicantDetail] = useState([]);
  const [resume, setResume] = useState('');
  const [interviewdate, setInterviewDate] = useState('');
  const [error, setError] = useState('');
  const [applicantStatus, setApplicantStatus] = useState('pending');
  
  



  useEffect(() => {
  
    axios.post(`/api/jobs/getjobs/${jobId}`)
  .then((response) => {
    
    
    
    
    setJob(response.data);

    
    const foundApplicant = response.data.applicants.find(applicant => applicant.user === userId);
    if (foundApplicant) {
      
      setResume(foundApplicant.resume);
      setApplicantStatus(foundApplicant.status);
      
    } else {
      
    }
  })
  .catch((error) => {
    setError('Failed to fetch job details');
    
  });

    axios.get(`/api/users/${userId}`)
      .then((response) => {
        setApplicant(response.data) 
        
        setApplicantDetail(response.data.profile[0]);
      })
      .catch((error) => {
       
      });
  }, []);
  const interview = () =>{
    if(status === 'interview'){
      axios.post(`/api/jobs/approve`, {
        userId: userId,
        interview:interviewdate,
        status: 'interview',
        jobId: jobId
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then((response) => {
       setApplicantStatus('interview');
       setStatus('')
      })
      .catch((error) => {
        console.error('Error scheduling interview:', error);
      });
    } 
    else if(status === 'rejected'){
      axios.post(`/api/jobs/approve`, {
        userId: userId,
        status: 'rejected',
        jobId: jobId
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then((response) => {
        setJob(response.data);
        setApplicantStatus('rejected');
        setStatus('')
      })
      .catch((error) => {
        console.error('Error rejecting applicant:', error);
      });

    }
  }
  
  

  return (
    <div className="flex-1">
      <div className='z-30'>
        <Sidebar />
      </div>
      
      <div className='flex-1  left-0 py-8  lg:px-72'>
      
      <div className="bg-white shadow-md p-6 rounded-lg mb-4">
      <div className="flex justify-between items-center mb-2">

        <div>
        <div className="flex-shrink-0 h-20 w-20">
        <img 
            src={applicant.avatarUrl} 
            alt={applicant.name} 
            className="h-full w-full object-cover rounded-full"
        />
    </div>
            <h1 className="text-3xl font-bold">{applicant.name}</h1>
            <p className="text-gray-600">{applicant.email}</p>
        </div>
        {
  applicantStatus === 'pending' ? (
    <div className="flex flex-col mb-4">
      <label htmlFor="status" className="text-sm font-medium text-gray-700 mb-1">Status</label>
      <select
        id="status"
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="" disabled>Select status</option>
        <option value="pending">Pending</option>
        <option value="interview">Interview</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>
  ) : (
    <>
  {applicantStatus === 'interview' && (
    <div className="flex items-center mb-2">
      <span className="text-sm text-green-500">{applicantStatus}</span>
    </div>
  )}
  {applicantStatus === 'rejected' && (
    <div className="flex items-center mb-2">
      <span className="text-sm text-red-500">{applicantStatus}</span>
    </div>
  )}
</>


  )
}

        
    
    </div>
</div>

<div className="flex flex-col md:flex-row justify-between">
    <div className="bg-white shadow-md p-6 rounded-lg mb-4 md:mr-4 md:w-1/2">
        <h2 className="text-xl font-bold mb-2">About this {applicant.name}</h2>
        {resume.split('\n').map((str, index) => <p key={index}>{str}</p>)}
        
        <h2 className="text-xl font-bold mt-4 mb-2">Skills</h2>
        <div className="flex flex-wrap">
          {applicantdetail.skills && applicantdetail.skills.map((skill, index) => (
            <div key={index} className="bg-blue-500 text-white rounded-full px-3 py-1 m-1 flex items-center">
              {skill}
            </div>
          ))}
        </div>

    </div>

    <div className="bg-white shadow-md p-6 rounded-lg md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{applicant.name} Details</h1>
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Field Of Study</h2>
            <p className="text-gray-600 bg-gray-200 rounded-md px-4 py-2">{applicantdetail.fieldOfStudy}</p>
        </div>
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Location</h2>
            <p className="text-gray-600 bg-gray-200 rounded-md px-4 py-2">{applicantdetail.location}</p>
        </div>
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Experience</h2>
            <p className="text-gray-600 bg-gray-200 rounded-md px-4 py-2">{applicantdetail.experience}</p>
        </div>
        <div className='mb-4'>
            <h2 className="text-xl font-bold mb-2">University</h2>
            <p className="text-gray-600 bg-gray-200 rounded-md px-4 py-2">{applicantdetail.university}</p>
        </div>
    </div>
</div>

    <div>
   

{status === 'interview' && (
  <div className="bg-white shadow-md p-6 rounded-lg mb-4">
    <h2 className="text-xl font-bold mb-2">Interview Schedule</h2>
    <div className="flex items-center mb-4">
      <label htmlFor="date" className="text-sm font-medium text-gray-700 mr-2">Date</label>
      <input
        type="date"
        id="date"
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        onChange={(e) => setInterviewDate(e.target.value)}

      />

      <button className="bg-blue-500 text-white py-2 px-4 rounded-md ml-4" onClick={interview}>Schedule</button>
    </div>
  </div>
)}

{status === 'rejected' && (
  <div className="bg-white shadow-md p-6 rounded-lg mb-4">
    
    <button className="bg-red-500 text-white py-2 px-4 rounded-md" onClick={interview}>Reject</button>
  </div>
)}

      </div>    
              
      </div>

    </div>
  );
};
