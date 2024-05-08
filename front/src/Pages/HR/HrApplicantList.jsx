import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../Components/Hr/Sidebar';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const HrApplicantList = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState({});
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    axios.post(`/api/jobs/getjobs/${jobId}`)
      .then((response) => {
        setJob(response.data);
      })
      .catch((error) => {
        console.error('Error fetching job details:', error);
      });

    axios.get('/api/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, [jobId]);

  // Function to get user by user ID
  const getUserById = (userId) => {
    
    return users.find(user => user._id === userId);
  };

  return (
    <div className="flex-1">
      <div className='z-30'>
        <Sidebar />
      </div>
      <div className="container mx-auto px-4 py-8 lg:px-72">
        <a href={`/editjob/${jobId}`} className="text-indigo-600 hover:text-indigo-900">Show</a>
        <h1 className="text-3xl font-bold mb-4">User List</h1>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NAME
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Field Of Study
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STATUS
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {job.applicants && job.applicants.length > 0 ? (
                job.applicants.map((applicant, index) => {
                  const user = getUserById(applicant.user);
                  return (
                    <tr key={index}>
                      
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <img className="h-8 w-8 rounded-full mr-2" src="http://res.cloudinary.com/dhw1mueq4/image/upload/v1693386159/g6z5ql38toxfup1bpic1.jpg" alt="User Avatar" />
                <div className="text-sm font-medium text-gray-900">{user ? user.name : 'Unknown'}</div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">{user ? user.profile[0].fieldOfStudy : 'Unknown'}</td>
            <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">{user ? user.profile[0].location : 'Unknown'}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                applicant.status === 'interview' ? 'bg-yellow-100 text-yellow-800' :
                applicant.status === 'pending' ? 'bg-blue-100 text-blue-800' :
                applicant.status === 'rejected' ? 'bg-red-100 text-red-800' :
                applicant.status === 'accepted' ? 'bg-green-100 text-green-800' : ''
              }`}>
                {applicant.status}
              </span>
            </td>
            {applicant.status === 'Rejected' ? (
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <span className="text-red-600">Rejected</span>
              </td>
            ) : (
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <a href={`/applicantlistdetail/${applicant.user}/${jobId}`} className="text-indigo-600 hover:text-indigo-900">Show</a>
              </td>
            )}
          </tr>
                    
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">No applicants found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
