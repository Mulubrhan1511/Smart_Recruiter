import React, { useState } from 'react';
import axios from 'axios';

export const ProfileForm = () => {
  const [formData, setFormData] = useState({
    location: '',
    fieldOfStudy: '',
    experience: '',
    university: ''
  });
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState(''); 
  const user = JSON.parse(localStorage.getItem('user'));

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue) {
      e.preventDefault(); 
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
   
    if (
      !formData.location.trim() ||
      !formData.fieldOfStudy.trim() ||
      !formData.experience.trim() ||
      !formData.university.trim()
    ) {
      setIsFormSubmitted(true); 
      return; 
    }
  
    
    axios
      .post(`/api/users/profile/${user._id}`, {
        ...formData,
        skills: tags,
      },{
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then((response) => {
        
        if(response.data && response.data.user && response.data.user.profile) {
          localStorage.setItem('user', JSON.stringify({
            ...user,
            verified: true,
            profile: response.data.user.profile
          }));
          
          setFormData({
            location: '',
            fieldOfStudy: '',
            experience: '',
            university: ''
          });
          setTags([]);
          setInputValue('');
          
          setIsFormSubmitted(false);
         
          window.location.href = '/';
        } else {
          
        }
      })
      
      .catch(error => {
        
      });
  };
  
  

  return (
    <div className="container mx-auto px-4 py-14">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700 font-semibold">Location</label>
            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className={`form-input mt-1 block w-full border border-gray-300 p-2 rounded-lg ${isFormSubmitted && !formData.location.trim() ? 'border-red-500' : ''}`} />
          </div>
          <div className="mb-4">
            <label htmlFor="fieldOfStudy" className="block text-gray-700 font-semibold">Field of Study</label>
            <input type="text" id="fieldOfStudy" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} className={`form-input mt-1 block w-full border border-gray-300 p-2 rounded-lg ${isFormSubmitted && !formData.fieldOfStudy.trim() ? 'border-red-500' : ''}`} />
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
          <div className="mb-4">
            <label htmlFor="experience" className="block text-gray-700 font-semibold">Experience</label>
            <input type="text" id="experience" name="experience" value={formData.experience} onChange={handleChange} className={`form-input mt-1 block w-full border border-gray-300 p-2 rounded-lg ${isFormSubmitted && !formData.experience.trim() ? 'border-red-500' : ''}`} />
          </div>
          <div className="mb-4">
            <label htmlFor="university" className="block text-gray-700 font-semibold">University</label>
            <input type="text" id="university" name="university" value={formData.university} onChange={handleChange} className={`form-input mt-1 block w-full border border-gray-300 p-2 rounded-lg ${isFormSubmitted && !formData.university.trim() ? 'border-red-500' : ''}`} />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save Changes</button>
        </div>
      </form>
    </div>
  );
};
