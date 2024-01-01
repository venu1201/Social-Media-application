import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from '../Home/Home';
import Profile from '../ProfilePage/Profile';
import { useDispatch, useSelector } from 'react-redux';
import Notifications from '../Notifications/Notifications';
import Settings from '../Settings/Settings';
import Postpage from '../Postpage/Postpage';
import { remove_profile_data } from '../../reducers';
import NewsPage from '../NewsPage/NewsPage';
import AuthLayout from '../Authpage/AuthLayout';
import SigninForm from '../Authpage/Forms/SigninForm';
import SignupForm from '../Authpage/Forms/SignupForm';
import GoogleSignupForm from '../Authpage/Forms/GoogleSignupForm';
import HomeLayout from '../HomeLayout/HomeLayout';
import ProfileEdit from '../ProfilePage/ProfilePageComponents/ProfileEdit';
import Network from '../ProfilePage/ProfilePageComponents/Network';
import CreatePost from '../Postpage/CreatePost';
import Explore from '../Explore/Explore';
import People from '../Explore/People';
const RouteWrapper = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authData);
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    if (user === null && !location.pathname.includes('/Auth')) {
      navigate('/Auth/Signin');
    }
    if (!location.pathname.includes('Profile')) {
      dispatch(remove_profile_data());
    }
  }, [location.pathname,user]);


  return (
    <div className='text-white flex-1 flex ss:flex-row flex-col-reverse fixed h-[100vh] w-screen'>
      {/* {!location.pathname.includes('/Auth') && (
        <Navbar />
      )} */}
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/Auth/Signin' element={<SigninForm />} />
          <Route path='/Auth/Signup' element={<SignupForm />} />
          <Route path='/Auth/google_auth' element={<GoogleSignupForm />} />
        </Route>
        <Route element={<HomeLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/Editprofile' element={<ProfileEdit/>}/> 
          <Route path='/Network/:user/:type' element={<Network/>}/> 
          <Route path='/Profile/:user' element={<Profile />} />
          <Route path='/Post/:id' element={<Postpage />} />
          <Route path='/CreatePost' element={<CreatePost/>}/>
          <Route path='/Explore' element={<Explore/>}/>
          <Route path='/People' element={<People/>}/>



          <Route path='/Notifications' element={<Notifications />} />
          <Route path='/Settings' element={<Settings />} />
          <Route path='/News' element={<NewsPage />} />
        </Route>

      </Routes>
      
    </div>
  );
};

export default RouteWrapper;
