import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from '../../Components/Candidate/Navbar';

export const DetailJob = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState({});
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const [applied, setApplied] = useState(false);
    const [resume, setResume] = useState('');
    const [isValid, setIsValid] = useState(false); // Initially set to false as it's empty// Initially set to true as it's empty
    const [showerror, setShowError] = useState(false); // Initially set to false as it's empty
    const handleInputChange = (event) => {
        const value = event.target.value;
        setResume(value);
        const wordCount = value.trim().split(/\s+/).length;
        setIsValid(wordCount > 50); // Check if the word count is more than 50
    };
    
    

    useEffect(() => {
        axios.post(`/api/jobs/getjobs/${jobId}`)
            .then((response) => {
                setJob(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching job details:', error);
                setLoading(false);
            });
    }, [jobId]);

    const apply = () => {

        setApplied(true);
    }
    const submit = () => {
        // Check if the resume is valid
        if (!isValid) {
            // Show error message
            setShowError(true);
            return; // Do not send the request if the resume is not valid
        }
    
        const token = localStorage.getItem('jwt');
    
        axios.post(`/api/jobs/apply`, {
            id: jobId,
            userId: user._id,
            resume: resume,
            fieldOfStudy: user.profile[0].fieldOfStudy,
            location: user.profile[0].location,
            name: user.name,

        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log('Applied:', response.data);
            setApplied(false); // Set applied to true after successful application
            // Fetch the updated job details after applying
            axios.post(`/api/jobs/getjobs/${jobId}`)
                .then((response) => {
                    setJob(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching job details:', error);
                    setLoading(false);
                });
        })
        .catch((error) => {
            console.error('Error applying for job:', error);
        });
    }
    
    


    return (
        <div className='relative w-full h-screen'>
      <Navbar />
      <div className="relative container  top-16 justify-center">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="w-full">
                    <div className="bg-white shadow-md p-6 rounded-lg mb-4">
    <div className="flex justify-between items-center mb-2">
        <div>
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <p className="text-gray-600">{job.company}</p>
        </div>
        {user && job.applicants.some(applicant => applicant.user === user._id) ? (
    <span className="bg-green-500 text-white px-2 py-1 rounded-md">Applied</span>
) : (
    <button className="bg-blue-500 text-white py-2 px-4 rounded-md" onClick={apply}>Apply</button>
)}


    </div>
</div>

<div className="flex flex-col md:flex-row justify-between">
    <div className="bg-white shadow-md p-6 rounded-lg mb-4 md:mr-4 md:w-1/2">
        <h2 className="text-xl font-bold mb-2">About this Job</h2>
        <p className="text-gray-600">{job.description}</p>
        <h2 className="text-xl font-bold mt-4 mb-2">Responsibilities</h2>
        <p className="text-gray-600">{job.responsibilities}</p>
        <h2 className="text-xl font-bold mt-4 mb-2">Requirements</h2>
        <p className="text-gray-600">{job.requirements}</p>
    </div>

    <div className="bg-white shadow-md p-6 rounded-lg md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">Job Details</h1>
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Salary</h2>
            <p className="text-gray-600 bg-gray-200 rounded-md px-4 py-2">{job.salary}</p>
        </div>
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Location</h2>
            <p className="text-gray-600 bg-gray-200 rounded-md px-4 py-2">{job.location}</p>
        </div>
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Experience</h2>
            <p className="text-gray-600 bg-gray-200 rounded-md px-4 py-2">{job.experience}</p>
        </div>
        <div>
            <h2 className="text-xl font-bold mb-2">Type</h2>
            <p className="text-gray-600 bg-gray-200 rounded-md px-4 py-2">{job.type}</p>
        </div>
    </div>
</div>




                    



                    {
    applied && (
        <div id="default-modal" className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-full max-w-md p-4 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">Write Your Resume</h3>
                    
                </div>
                <div className="space-y-4 py-8">
                <textarea
                className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder="Enter your resume..."
                value={resume}
                onChange={handleInputChange}
            ></textarea>
            {showerror && (
                <p className="text-red-500">Resume must not be empty and must contain more than 50 words.</p>
            )}
                    </div>
                <div className="flex items-center justify-end mt-4">
                    <button
                        onClick={submit}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-3"
                    >
                        I accept
                    </button>
                    <button
                        onClick={() => setApplied(false)}
                        className="text-gray-900 bg-white hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                        Decline
                    </button>
                </div>
            </div>
        </div>
    )
}





                </div>
            )}
        </div>
        </div>
        
    );
};