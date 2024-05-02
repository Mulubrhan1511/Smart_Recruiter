import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { filterJobs } from "../../features/jobSlice";

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

export const Sidebar = () => {
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

  return (
    <div className="sm:bg-red-700">
      <div className="w-64 bg-gray-200 p-4">
        
        <h2 className="text-lg font-semibold mb-4 px-12">Filter</h2>
        <div className='py-10'>
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
        <h2 className="text-lg font-semibold mb-4 px-12">Job Type</h2>
        <div className='py-10'>
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
  );
};
