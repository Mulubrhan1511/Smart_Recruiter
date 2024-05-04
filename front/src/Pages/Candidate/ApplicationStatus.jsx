import React, { useEffect, useState } from 'react';
import { Navbar } from '../../Components/Candidate/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export const ApplicationStatus = () => {
    const [jobs, setJobs] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        axios.get(`/api/jobs/getapplyjob/${user._id}`)
            .then((response) => {
                setJobs(response.data);
                 // Ensure you're getting the expected data
            })
            .catch((error) => {
                
            });
    }, []);

    return (
        <div className="">
            <Navbar />
            <div className="container mx-auto px-4 py-28">
                <h1 className="text-3xl font-bold text-center mb-4">Application Status</h1>
                {
    jobs ? (
        <div className="grid grid-cols-1 gap-4">
            {jobs.length > 0 ? (
                jobs.map(job => (
                    <div key={job._id} className="bg-white shadow-md p-4 rounded-lg flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold mb-2">{job.title}</h2>
                            <p className="text-gray-600">Company: {job.company}</p>
                        </div>
                        <div>
                            {job.applicants.find(applicant => applicant.user === user._id)?.status === 'pending' && <span className="text-blue-600 font-bold">Under Review</span>}
                            {job.applicants.find(applicant => applicant.user === user._id)?.status === 'interview' && <span className="text-green-500 font-bold">Interview</span>}
                            {job.applicants.find(applicant => applicant.user === user._id)?.status === 'rejected' && <span className="text-red-500 font-bold">Rejected</span>}
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-lg text-gray-600 font-semibold mt-8 text-center">
    You haven't applied to any jobs yet.
</p>

            )}
        </div>
    ) : (
        // You can add a loading indicator or any other appropriate component here
        <p>Loading...</p>
    )
}

                
            </div>
        </div>
    );
};
