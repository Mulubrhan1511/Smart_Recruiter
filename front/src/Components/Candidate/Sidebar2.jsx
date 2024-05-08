import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { filterJobs } from "../../features/jobSlice";
import menu from '../../assets/menu.svg';

// Initial data
const initialExperienceList = [
  { id: 0, experience: '0-1 years', seen: false },
  { id: 1, experience: '1-3 years', seen: false },
  { id: 2, experience: '3-5 years', seen: false },
  { id: 3, experience: '5+ years', seen: false },
];

const initialJobTypesList = [
  { id: 4, type: 'full-time', seen: false },
  { id: 5, type: 'part-time', seen: false },
  { id: 6, type: 'remote', seen: false },
  { id: 7, type: 'permanent', seen: false },
];

const initialJobsbydate = [
  { id: 8, date: 'Today', seen: false },
  { id: 9, date: 'This Week', seen: false },
  { id: 10, date: 'This Month', seen: false },
];

export const Sidebar2 = () => {
  const dispatch = useDispatch();
  const [experienceCheckboxes, setExperienceCheckboxes] = useState(initialExperienceList);
  const [jobTypesCheckboxes, setJobTypesCheckboxes] = useState(initialJobTypesList);
  const [jobsbydateCheckboxes, setJobsbydateCheckboxes] = useState(initialJobsbydate);

  const handleExperienceCheckboxChange = (id) => {
    const updatedCheckboxes = experienceCheckboxes.map(checkbox =>
      checkbox.id === id ? { ...checkbox, seen: !checkbox.seen } : checkbox
    );
    setExperienceCheckboxes(updatedCheckboxes);
    
  };

  const handleTypeCheckboxChange = (id) => {
    const updatedCheckboxes = jobTypesCheckboxes.map(checkbox =>
      checkbox.id === id ? { ...checkbox, seen: !checkbox.seen } : checkbox
    );
    
    setJobTypesCheckboxes(updatedCheckboxes);
    
  };

  const handleDateCheckboxChange = (id) => {
    const updatedCheckboxes = jobsbydateCheckboxes.map(checkbox =>
      checkbox.id === id ? { ...checkbox, seen: !checkbox.seen } : checkbox
    );
    setJobsbydateCheckboxes(updatedCheckboxes);
  };

  useEffect(() => {
    const selectedExperience = experienceCheckboxes.filter(checkbox => checkbox.seen).map(checkbox => checkbox.experience);
    const selectedTypes = jobTypesCheckboxes.filter(checkbox => checkbox.seen).map(checkbox => checkbox.type);
    const selectedDate = jobsbydateCheckboxes.filter(checkbox => checkbox.seen).map(checkbox => checkbox.date);

    dispatch(filterJobs({ experience: selectedExperience, types: selectedTypes, date: selectedDate }));
  }, [experienceCheckboxes, jobTypesCheckboxes, jobsbydateCheckboxes, dispatch]);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed Sidebar  ${isOpen ? '' : ''}`}>
      <button className={`md:hidden justify-start left-0 z-50 top-20${isOpen ? 'bg-red-600 w-64 bg-opacity-95' : ''}`} onClick={toggle}>
        <img src={menu} alt='menu' className='w-10 h-10 mr-6 justify-end' />
      </button>

      <div className={`flex flex-col h-screen w-64 fixed shadow-md ${isOpen ? ' px-3 bg-silver bg-opacity-95' : 'px-3 hidden md:flex  bg-silver'}`}>
        <div className='flex flex-col top '>
          <h2 className="text-lg font-semibold py-4">Experience</h2>
          <div className='py-2'>
            {experienceCheckboxes.map(checkbox => (
              <label key={checkbox.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={checkbox.seen}
                  onChange={() => handleExperienceCheckboxChange(checkbox.id)}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                <span>{checkbox.experience}</span>
              </label>
            ))}
          </div>

          <h2 className="text-lg font-semibold mb-4 ">Job Type</h2>
          <div className='py-2'>
            {jobTypesCheckboxes.map(checkbox => (
              <label key={checkbox.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={checkbox.seen}
                  onChange={() => handleTypeCheckboxChange(checkbox.id)}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                <span>{checkbox.type}</span>
              </label>
            ))}
          </div>

          <h2 className="text-lg font-semibold mb-4 ">Job Date</h2>
          <div className='py-2'>
            {jobsbydateCheckboxes.map(checkbox => (
              <label key={checkbox.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={checkbox.seen}
                  onChange={() => handleDateCheckboxChange(checkbox.id)}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                <span>{checkbox.date}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
