import React from 'react'
import { Navbar } from '../../Components/Candidate/Navbar';
import { useDispatch, useSelector } from 'react-redux';
export const ApplicationStatus = () => {
    const filteredJobs = useSelector(state => state.jobs.filteredJobs);
    console.log(filteredJobs)
    const jobApplications = [
        {
          id: 1,
          jobTitle: 'Frontend Developer',
          status: 'Applied'
        },
        {
          id: 2,
          jobTitle: 'Backend Developer',
          status: 'Rejected'
        },
        {
          id: 3,
          jobTitle: 'Full Stack Developer',
          status: 'Accepted'
        },
        // Add more job applications with statuses
    ];

    return (
        <div className="">
            <Navbar />
            <div className="container mx-auto px-4 py-28">
            <h1 className="text-3xl font-bold text-center mb-4">Application Status</h1>
            <div className="grid grid-cols-1 gap-4">
                {jobApplications.map(application => (
                    <div key={application.id} className="bg-white shadow-md p-4 rounded-lg flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold mb-2">{application.jobTitle}</h2>
                            <p className="text-gray-600">Status: {application.status}</p>
                        </div>
                        <div>
                            {application.status === 'Applied' && <span className="text-yellow-500 font-bold">Applied</span>}
                            {application.status === 'Accepted' && <span className="text-green-500 font-bold">Accepted</span>}
                            {application.status === 'Rejected' && <span className="text-red-500 font-bold">Rejected</span>}
                        </div>
                    </div>
                ))}
            </div>
            </div>
            
        </div>
    );
}
