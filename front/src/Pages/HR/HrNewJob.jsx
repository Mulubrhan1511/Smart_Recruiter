import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../Components/Hr/Sidebar';
import axios from 'axios';

export const HrNewJob = () => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [salary, setSalary] = useState('');
  const [type, setType] = useState('fulltime');
  const [totalApplicants, setTotalApplicants] = useState(0);
  const [expiryDate, setExpiryDate] = useState('');
  const [success, setSuccess] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // State to track form submission
  const [error, setError] = useState(null); // State to track error
  const [experience, setExperience] = useState(''); 

  useEffect(() => {
    if(error){
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue) {
      e.preventDefault(); // Prevent form submission
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  const submit = () => {
    setIsFormSubmitted(true); // Set form submitted to true
    if (
      !title.trim() ||
      !description.trim() ||
      !location.trim() ||
      !company.trim() ||
      !salary.trim() ||
      totalApplicants <= 0 ||
      !expiryDate.trim() ||
      !experience.trim() // Check if experience is selected
    ) {
      setError('Please fill out all fields.'); // Set error message
      return;
    }
  
    const token = localStorage.getItem('jwt');
  
    axios
      .post(`/api/jobs`, {
        title: title,
        description: description,
        location: location,
        company: company,
        salary: salary,
        type: type,
        skills: tags,
        totalApplicants: totalApplicants,
        expiryDate: expiryDate,
        experience: experience, // Include experience in the request payload
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        
        setSuccess(true);
        setTitle('');
        setDescription('');
        setLocation('');
        setCompany('');
        setSalary('');
        setType('');
        setTags([]);
        setTotalApplicants(0);
        setExpiryDate('');
        setExperience(''); // Reset experience state
        setIsFormSubmitted(false); // Reset form submission state
      })
      .catch((error) => {
        console.error('Error applying for job:', error);
        setError('An error occurred. Please try again.'); // Set error message
        setIsFormSubmitted(false); // Reset form submission state
      });
  };
  

  return (
    <div className="flex-1">
      <div className='z-30'>
        <Sidebar />
      </div>
      <div className="container mx-auto px-4 py-8 lg:px-72">
        {success && (
          <div id="toast-success" className="z-50 justify-end right-0 fixed flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
              </svg>
              <span className="sr-only">Check icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">Job Added successfully.</div>
          </div>
        )}

        {error && <div id="toast-success" className="z-50 justify-end right-0 fixed flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
        </svg>
              <span className="sr-only">Check icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">{error}</div>
          </div>} {/* Display error message if there is an error */}
        
        <h1 className="text-2xl font-semibold mb-4 items-center">Add New Job</h1>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="bg-white shadow-md p-6 rounded-lg mb-4 md:mr-4 md:w-1/2">
            <div className="flex flex-col mb-4">
              <label className="text-lg font-semibold mb-2">Job Title</label>
              <input type="text" className={`border border-gray-300 p-2 rounded-lg ${isFormSubmitted && !title.trim() ? 'border-red-500' : ''}`} placeholder="Job Title" value={title} onChange={(e)=> setTitle(e.target.value)} />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-lg font-semibold mb-2">Job Description</label>
              <textarea className={`border border-gray-300 p-2 rounded-lg ${isFormSubmitted && !description.trim() ? 'border-red-500' : ''}`} placeholder="Job Description" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-lg font-semibold mb-2">Location</label>
              <input type="text" className={`border border-gray-300 p-2 rounded-lg ${isFormSubmitted && !location.trim() ? 'border-red-500' : ''}`} placeholder="Location" value={location} onChange={(e)=> setLocation(e.target.value)} />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-lg font-semibold mb-2">Company Name</label>
              <input type="text" className={`border border-gray-300 p-2 rounded-lg ${isFormSubmitted && !company.trim() ? 'border-red-500' : ''}`} placeholder="Company Name" value={company} onChange={(e)=> setCompany(e.target.value)} />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-lg font-semibold mb-2">Salary</label>
              <input type="text" className={`border border-gray-300 p-2 rounded-lg ${isFormSubmitted && !salary.trim() ? 'border-red-500' : ''}`} placeholder="Salary" value={salary} onChange={(e)=> setSalary(e.target.value)}/>
            </div>
          </div>

          <div className="bg-white shadow-md p-6 rounded-lg mb-4 md:mr-4 md:w-1/2">
            <div className="flex flex-col mb-4">
              <label className="text-lg font-semibold mb-2">Job Type</label>
              <select className="border border-gray-300 p-2 rounded-lg" value={type} onChange={(e)=> setType(e.target.value)}>
                <option value="fulltime">Full-time</option>
                <option value="parttime">Part-time</option>
                <option value="contract">Contract</option>
                <option value="remote">Remote</option>
              </select>
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-lg font-semibold mb-2">Skills</label>
              <div className="flex flex-wrap">
                {tags.map((tag, index) => (
                  <div key={index} className="bg-blue-500 text-white rounded-full px-3 py-1 m-1 flex items-center">
                    {tag}
                    <button type="button" className="ml-2" onClick={() => handleTagDelete(tag)}>
                      x
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder="Type and press Enter to add a skill"
                className="border border-gray-300 p-2 rounded-lg mt-2"
              />
            </div>

            <div className="flex flex-col mb-4">
  <label className="text-lg font-semibold mb-2">Experience</label>
  <select
    className={`border border-gray-300 p-2 rounded-lg ${isFormSubmitted && !experience.trim() ? 'border-red-500' : ''}`}
    value={experience}
    onChange={(e) => setExperience(e.target.value)}
  >
    <option value="">Select Experience</option>
    <option value="0-1 years">0-1 years</option>
    <option value="1-3 years">1-3 years</option>
    <option value="3-5 years">3-5 years</option>
    <option value="5+ years">5+ years</option>
  </select>
</div>


            <div className="flex flex-col mb-4">
              <label className="text-lg font-semibold mb-2">Total Applicants Needed</label>
              <input 
                type="number"
                className={`border border-gray-300 p-2 rounded-lg ${isFormSubmitted && totalApplicants <= 0 ? 'border-red-500' : ''}`}
                placeholder="Total"
                value={totalApplicants}
                onChange={(e) => setTotalApplicants(parseInt(e.target.value))}
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-lg font-semibold mb-2">Application Expiry Date</label>
              <input 
                type="date" 
                className={`border border-gray-300 p-2 rounded-lg ${isFormSubmitted && !expiryDate.trim() ? 'border-red-500' : ''}`} 
                value={expiryDate} 
                onChange={(e) => setExpiryDate(e.target.value)} 
              />
            </div>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={submit}>Add Job</button>
          </div>
        </div>  
      </div>
    </div>
  );
};
