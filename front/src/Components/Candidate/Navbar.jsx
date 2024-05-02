import React, { useState,useEffect } from 'react';
import log from "../../assets/react.svg";
import menu from "../../assets/menu.svg";
import profile from "../../assets/Profile.png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrop, setIsDrop] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigation = 
  user ? [
  { name: 'Home', href: '/', current: false },
  
  { name: 'Jobs', href: '/jobs', current: false },
  { name: 'Status', href: '/status', current: false },
  ]
  : 
  [
    { name: 'Home', href: '/', current: false },
    { name: 'Jobs', href: '/jobs', current: false },
    
  
  ]
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) { // Adjust the scroll threshold as needed
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdown = () => {
    setIsDrop(!isDrop);
  };

  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  
  return (
    <div className='w-full z-50'>
      <nav className={`fixed top-0 z-20 w-full flex items-center justify-between h-20 ${isScrolled ? 'bg-silver' : 'bg-transparent'}`}>
        <div className='flex items-center justify-start w-1/3'>
          <img
            src={log}
            alt='logo'
            className='w-10 h-10 ml-2 justify-start'
          />
        </div>
        <div className='hidden md:flex w-1/3 justify-center text-brown '>
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className='font-bold text-lg  mx-4'
            >
              {item.name}
            </a>
          )
          )}
        </div>
        <div className='w-1/3 flex justify-end items-center'>
          <button onClick={toggle}>
            <img
              src={menu}
              alt='menu'
              className='md:hidden w-10 h-10 mr-6 justify-end'
            />
          </button>
          {
  user ? (
    <div className="relative  text-left">
  <div>
    <button className="w-10 h-10  bg-white  rounded-full overflow-hidden border-2  focus:border-black" onClick={toggleDropdown}>
    <img
          src={profile}
          alt="profile"
          className="w-full h-full object-cover"
        />
    </button>
  </div>

  {
    isDrop && (
      <div className="absolute right-0 z-10  w-56 rounded-md bg-white shadow-lg" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
    <div className="py-1" role="none">
      
      <a href="/profile" className="text-gray-700 block px-4 py-2 text-sm hover:bg-blue-600 rounded-lg">Account settings</a>
      <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-blue-600 rounded-lg">Support</a>
      <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-red-500 rounded-lg" onClick={handleSignOut}>Log out</a>
      
    </div>
  </div>
    )
  }
  
</div>


  ) : (
    <a
      href='/login'
      className='font-bold text-lg mx-4 bg-blue-500 text-white px-4 py-2 rounded-md'
    >
      Login
    </a>
  )
}

         
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden fixed top-20 left-0 right-0 bg-silver z-20 text-brown">
          <div className="flex flex-col items-center">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className='text-lg font-bold my-2'
              >
                {item.name}
              </a>
            ))}
            
            
          </div>
        </div>
      )}
    </div>
  );
};
