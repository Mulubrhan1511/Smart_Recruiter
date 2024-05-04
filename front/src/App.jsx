import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './Pages/Candidate/Home';
import { ApplicationStatus } from './Pages/Candidate/ApplicationStatus';
import { Signup } from './Pages/Candidate/Signup';
import { Signin } from './Pages/Candidate/Signin';
import { Jobs } from './Pages/Candidate/Jobs';
import { Verfication } from './Pages/Candidate/Verfication';
import  HrHome  from './Pages/HR/HrHome';
import { HrApplicantList } from './Pages/HR/HrApplicantList';
import {HrApplicantDetails} from './Pages/HR/HrApplicantDetails';
import { HrNewJob } from './Pages/HR/HrNewJob';
import { HrNewUser } from './Pages/HR/HrNewUser';
import { DetailJob } from './Pages/Candidate/DetailJob';
import { ProfileForm } from './Pages/Candidate/Profile';
import { ForgotPassword } from './Pages/Candidate/ForgotPassword';
import { EditProfile } from './Pages/Candidate/EditProfile';

function App() {
  const user = JSON.parse(localStorage.getItem("user"));


  // Conditionally render different sets of routes based on user existence and verification
  let routesToRender;
  if (user) {
    if (user.verified) {
      if (user.profile && user.profile.length > 0) {
        if(user.type === "admin"){
          routesToRender = (
            <>
              <Route path='/' element={<HrHome />} />
              <Route path='/applicantlist/:jobId' element={<HrApplicantList />} />
              <Route path='/applicantlistdetail/:userId/:jobId' element={<HrApplicantDetails />} />
  
              <Route path='/newjob' element={<HrNewJob/>} />
              <Route path='/newuser' element={<HrNewUser/>} />
              <Route path='*' element={<HrHome />} />
            </>
          );
  
        } else {
          routesToRender = (
            <>
              <Route path='/' element={<Home />} />
              
              <Route path='/jobs' element={<Jobs/>} />
              <Route path='/status' element={<ApplicationStatus/>} />
              <Route path='/detailjob/:jobId' element={<DetailJob />} />
              <Route path='/profile' element={<EditProfile />} />
              <Route path='*' element={<Home/>} />
            </>
          );
        }
      }
      else{
        routesToRender = (
          <>
            <Route path='/' element={<ProfileForm />} />
            <Route path='*' element={<ProfileForm />} />
          </>
        );
      }
        
      
      
      // Render routes for verified user
      
      
    } else {
      // Render route for unverified user
      routesToRender =
      <>
      <Route path='/verification' element={<Verfication/>} />
      <Route path='*' element={<Verfication/>} />
      </> 
    }
  } else {
    // Render routes for non-existent user
    routesToRender = (
      <>
        <Route path='/' element={<Home />} />
        <Route path='/jobs' element={<Jobs/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Signin/>} />
        <Route path='/forgotpassword' element={<ForgotPassword/>} />
        <Route path='*' element={<Home/>} />
        </>
    );
  }

  return (
    <div className='bg-white'>
      <div>
        <BrowserRouter>
          <Routes>
            {routesToRender}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
