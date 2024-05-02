import React,{useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Sidebar } from '../../Components/Hr/Sidebar';
import axios from 'axios';

const HrHome = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [jobs, setJobs] = useState([]); // Define jobs state to store the fetched jobs
  useEffect(() => {
      axios.get('/api/jobs')
        .then((response) => {
          setJobs(response.data); // Update the jobs state with the fetched data
        })
        .catch((error) => {
          console.error('Error fetching jobs:', error);
        });
    }, []); // Empty dependency array to fetch data only once when component mounts

  return (
    <div className="flex-1">
      <div className='z-30'>
        <Sidebar />
      </div>
      
      <div className='flex-1  left-0 py-8  lg:px-72'>
        <h1 className='text-4xl font-bold mb-8 text-gray-900'>Welcome, {user.name}!</h1>
        <a href='/home'>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {
  jobs.map(job => (
    <a href={'/applicantlist/' + job._id} key={job._id}>
      <div key={job.id} className={`bg-white shadow-md p-6 rounded-lg flex flex-col justify-between mb-6 ${jobs.length > 1 ? 'md:col-span-1' : ''}`}>
      <div>
        <h2 className="text-lg font-semibold mb-2">{job.title}</h2>
        <p className="text-gray-600 mb-2">{job.company} - {job.location}</p>
        <p className="text-sm text-gray-700 mb-4">{job.description}</p>
        {/* Calculate days left */}
        {(() => {
          const today = new Date();
          const expirationDate = new Date(job.expiryDate);
          const differenceInTime = expirationDate.getTime() - today.getTime();
          const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
          const expirationText = differenceInDays > 0 ? `${differenceInDays} days left` : '';
          return (
            expirationText ? (
              <span className="bg-blue-600 text-white px-2 py-1 rounded-md">{expirationText}</span>
            ) : (
              <span className="bg-red-600 text-white px-2 py-1 rounded-md">Expired</span>
            )
          );
        })()}
      </div>
      
      <div className="mt-4 flex items-center">
      {
  (() => {
    const applicants = job.applicants.length;
    return (
      <>
        <span className="text-sm text-gray-600 mr-2">{`${(applicants / job.totalApplicants) * 100}% filled`}</span>
        <div className="h-2 w-full bg-gray-300 rounded-md overflow-hidden">
          <div className="h-full bg-blue-600" style={{ width: `${(applicants / job.totalApplicants) * 100}%` }}></div>
        </div>
      </>
    );
  })()
}

        

      </div>
    </div>
    </a>
    
  ))
}


        </div>
        </a>
      </div>
    </div>
  );
};

export default HrHome;
