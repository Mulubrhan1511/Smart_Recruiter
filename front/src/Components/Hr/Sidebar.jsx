import React, { useState } from 'react';
import menu from '../../assets/menu.svg';
import dropdown from '../../assets/dropdown.svg';


export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  

  return (
    <div className={`Sidebar z-40 ${isOpen ? '' : ''}`}>
      <button className={`md:hidden justify-start left-0 ${isOpen ? 'bg-bermuda w-64 bg-opacity-95' : ''}`} onClick={toggle}>
        <img src={menu} alt='menu' className='w-10 h-10 mr-6 justify-end' />
      </button>
      <div className={`flex flex-col h-screen w-64 fixed ${isOpen ? 'md:static top-10 md:top-auto justify-center bg-bermuda bg-opacity-95' : 'hidden md:flex justify-center bg-bermuda'}`}>

        <div className='flex flex-col items-center top '>
          
          <a href='/' className="text-white font-bold text-lg my-4">
            Home
          </a>
          <a href='/newjob' className="text-white font-bold text-lg my-4">
            Add Job
          </a>
          <a href='/newuser' className="text-white font-bold text-lg my-4">
            New Hr
          </a>
          <a onClick={toggleDropdown} className="flex px-3 items-center text-white font-bold text-lg my-4">
            Profile
            <img src={dropdown} alt='menu' className='w-7 h-10 ml-2 justify-end' />
          </a>
          
          <div className="relative">
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-md">
              <a href="/profile" className="block px-4 py-2 text-gray-800  hover:bg-green-600 sm:bg-green-500 ">Account</a>
              <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-red-500 sm:bg-red-500" onClick={handleSignOut}>Log out</a>

            </div>
          )}
    </div>
          
          
        </div>
      </div>
    </div>
  );
};

