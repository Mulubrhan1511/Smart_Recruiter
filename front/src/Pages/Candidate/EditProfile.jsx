import React, { useState, useEffect } from 'react';
import { Navbar } from '../../Components/Candidate/Navbar';
import axios from 'axios';

export const EditProfile = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [location, setLocation] = useState('');
    const [university, setUniversity] = useState('');
    const [fieldOfStudy, setFieldOfStudy] = useState('');
    const [experience, setExperience] = useState('');
    const [image, setImage] = useState(null);
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

    useEffect(() => {
        axios.get(`/api/users/${user._id}`)
            .then((response) => {
                setEmail(response.data.email);
                setName(response.data.name);
                setAvatarUrl(response.data.avatarUrl);
                setLocation(response.data.profile[0].location);
                setUniversity(response.data.profile[0].university);
                setFieldOfStudy(response.data.profile[0].fieldOfStudy);
                setExperience(response.data.profile[0].experience);
                setTags(response.data.profile[0].skills);
                setAvatarUrl(response.data.avatarUrl)
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); 
    };

    const handleImageUpload = () => {
       
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'insta-clone');
        formData.append("cloud_name","dhw1mueq4");
    
        
        return axios.post('https://api.cloudinary.com/v1_1/dhw1mueq4/image/upload', formData)
            .then(response => {
                
                setAvatarUrl(response.data.url);
                return response.data.url; 
            })
            .catch(error => {
                console.error('Error uploading image:', error);
                throw error; 
            });
    };
    
    const submit = () => {
        setIsFormSubmitted(true);
        if(image === null) {
            axios.patch(`/api/users/${user._id}`, {
                email: email,
                name: name,
                avatarUrl: avatarUrl,
                location,
                university,
                skills: tags,
                experience,
                fieldOfStudy
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            .then((response) => {
                
                localStorage.setItem("user", JSON.stringify(response.data));
                setSuccess(true);
                setIsFormSubmitted(false);
                setTimeout(() => setSuccess(false), 3000); 
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                setError('An error occurred. Please try again.');
                setIsFormSubmitted(false);
                setTimeout(() => setError(null), 3000); 
            });
        }
        
        else{
            
            handleImageUpload()
            .then(updatedAvatarUrl => {
                axios.patch(`/api/users/${user._id}`, {
                    email: email,
                    name: name,
                    avatarUrl: updatedAvatarUrl,
                    location,
                    university,
                    skills: tags,
                    experience,
                    fieldOfStudy
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                })
                .then((response) => {
                    localStorage.setItem("user",JSON.stringify(response.data))
                    setSuccess(true);
                    setIsFormSubmitted(false);
                    setTimeout(() => setSuccess(false), 3000); 
                })
    
                
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                setError('An error occurred. Please try again.');
                setIsFormSubmitted(false);
                setTimeout(() => setError(false), 3000); 
            });
        
        }
    };
    
    
    
    

    return (
        <div className='relative w-full h-screen'>
            <Navbar />
            <div className="relative container  top-16 justify-center">
                {success && (
                    <div id="toast-success" className="z-50 justify-end right-0 fixed flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800">
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>
                            <span className="sr-only">Check icon</span>
                        </div>
                        <div className="ms-3 text-sm font-normal">Profile Updated successfully.</div>
                    </div>
                )}

                {error && (
                    <div id="toast-error" className="z-50 justify-end right-0 fixed flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800">
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M1.888 1.482A1 1 0 0 1 3 0h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3.333l-.544.727a2 2 0 0 1-3.246.277l-5.292-4.234a1 1 0 0 1-.256-1.114L8.92 4.28a2 2 0 0 1 3.245-.277l.545.727H17a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H3a1 1 0 0 0-.888.55L.428 5.608a1 1 0 0 0 .256 1.114l5.293 4.233a2 2 0 0 0 3.244.278l.544-.728H17a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V1.482zM4 6.978a1 1 0 0 0 1 1h4a1 1 0 1 0 0-2H5a1 1 0 0 0-1 1zm0 3a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H4zm13 8.196a1 1 0 0 0-1 1V3a1 1 0 0 0-1-1H5.678L3.82 1h12.355a1 1 0 0 1 1 1v16.174a1 1 0 0 0-1-1zM9.53 9.383l-.503.671a1 1 0 1 1-1.545-1.288l.503-.671a1 1 0 1 1 1.545 1.288zm.964 4.877a1 1 0 1 1-1.543-1.29l.503-.67a1 1 0 1 1 1.545 1.288l-.503.672zm.786-1.204a1 1 0 1 1 1.545-1.288l.503-.671a1 1 0 1 1 1.545 1.288l-.503.672a1 1 0 0 1-1.544.287z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Error icon</span>
                        </div>
                        <div className="ms-3 text-sm font-normal">{error}</div>
                    </div>
                )}

                <h1 className="text-2xl font-semibold mb-4 items-center">Edit Profile</h1>
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="bg-white shadow-md p-6 rounded-lg mb-4 md:w-1/2">

                    <div className="flex flex-col mb-4">
                            <label className="text-lg font-semibold mb-2">Full Name</label>
                            <input type="text" className={`border border-gray-300 p-2 rounded-lg ${isFormSubmitted && !name.trim() ? 'border-red-500' : ''}`} placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div> 
                        <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <button onClick={handleImageUpload}>Upload Image</button>
                        <div className="flex flex-col mb-4">
                        <label className="text-lg font-semibold mb-2">Email</label>
                        <input 
                            type="email" 
                            className={`border border-gray-300 p-2 rounded-lg ${isFormSubmitted && !email.trim() ? 'border-red-500' : ''}`} 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            disabled={Boolean(user)}
                        />

                    </div>


                        

                        

                        <div className="flex flex-col">
                                <label className="text-base font-semibold mb-1">Field of Study</label>
                                <input
    type="text"
    className={`border border-gray-300 p-2 rounded-lg ${isFormSubmitted && error === null && !fieldOfStudy.trim() ? 'border-red-500' : ''}`}
    placeholder="Field of Study"
    value={fieldOfStudy}
    onChange={(e) => setFieldOfStudy(e.target.value)}
/>

                               </div>
                            <div className="flex flex-col">
                                <label className="text-base font-semibold mb-1">University</label>
                                <input
    type="text"
    className={`border border-gray-300 p-2 rounded-lg ${isFormSubmitted && error === null && !university.trim() ? 'border-red-500' : ''}`}
    placeholder="University"
    value={university}
    onChange={(e) => setUniversity(e.target.value)}
/>

                               
                                 </div>
                        
                    </div>

                    <div className="bg-white shadow-md p-6 rounded-lg mb-4 md:w-1/2">
                        {/* Profile */}
                        <div className="flex flex-col mb-4">
                            
                            
                            <div className="flex flex-col">
                                <label className="text-base font-semibold mb-1">Location</label>
                                <input
    type="text"
    className={`border border-gray-300 p-2 rounded-lg ${isFormSubmitted && error === null && !location.trim() ? 'border-red-500' : ''}`}
    placeholder="Location"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
/>

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
                            
                            <div className="flex flex-col">
                                <label className="text-base font-semibold mb-1">Experience</label>
                                <input
    type="text"
    className={`border border-gray-300 p-2 rounded-lg ${isFormSubmitted && error === null && !experience.trim() ? 'border-red-500' : ''}`}
    placeholder="Experience"
    value={experience}
    onChange={(e) => setExperience(e.target.value)}
/>

                                </div>
                        </div>
                    </div>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={submit}>Save Changes</button>
            </div>
        </div>
    );
};
