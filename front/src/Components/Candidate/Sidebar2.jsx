import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { filterJobs } from "../../features/jobSlice";
import menu from '../../assets/menu.svg';
// Initial data
const initialTitlesList = [
  { id: 0, title: 'Frontend Developer', seen: false },
  { id: 1, title: 'Backend Developer', seen: false },
  { id: 2, title: 'Full Stack Developer', seen: false },
];

const initialJobTypesList = [
  { id: 3, type: 'Full-time', seen: false },
  { id: 4, type: 'Part-time', seen: false },
  { id: 5, type: 'Remote', seen: false },
  { id: 6, type: 'Permanent', seen: false },
];


export const Sidebar2 = () => {
    const dispatch = useDispatch();
  const [titlesCheckboxes, setTitlesCheckboxes] = useState(initialTitlesList);
  const [jobTypesCheckboxes, setJobTypesCheckboxes] = useState(initialJobTypesList);

  const handleTitleCheckboxChange = (id) => {
    const updatedCheckboxes = titlesCheckboxes.map(checkbox =>
      checkbox.id === id ? { ...checkbox, seen: !checkbox.seen } : checkbox
    );
    setTitlesCheckboxes(updatedCheckboxes);
  };

  const handleTypeCheckboxChange = (id) => {
    const updatedCheckboxes = jobTypesCheckboxes.map(checkbox =>
      checkbox.id === id ? { ...checkbox, seen: !checkbox.seen } : checkbox
    );
    setJobTypesCheckboxes(updatedCheckboxes);
  };

  useEffect(() => {
    const selectedTitles = titlesCheckboxes.filter(checkbox => checkbox.seen).map(checkbox => checkbox.title);
    const selectedTypes = jobTypesCheckboxes.filter(checkbox => checkbox.seen).map(checkbox => checkbox.type);
    
    dispatch(filterJobs({ titles: selectedTitles, types: selectedTypes }));
  }, [titlesCheckboxes, jobTypesCheckboxes, dispatch]);
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
        <h2 className="text-lg font-semibold py-4">Titles</h2>
        <div className='py-2'>
          {titlesCheckboxes.map(checkbox => (
            <label key={checkbox.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={checkbox.seen}
                onChange={() => handleTitleCheckboxChange(checkbox.id)}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span>{checkbox.title}</span>
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
        </div>
      </div>
    </div>
  );
};

