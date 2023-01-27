import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/user/userSlice';

import '../App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import SignupModal from './SignupModal';
import Footer from './Footer';

export default function App () {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/api/me')
      .then(r => {
        if (r.ok) {
          r.json().then(data => dispatch(login(data)));
        }
      })
  }, [dispatch]);

  return (
    <>
      <SignupModal />
      <Header />
      <Sidebar />
      <Outlet />
      <Footer />
    </>
  )
}
