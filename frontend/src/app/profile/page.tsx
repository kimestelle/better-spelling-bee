"use client";

// import ProtectedRoute from '../../components/ProtectedRoute';
// import { useAuth } from '../context/AuthContext';

import Avatar from './components/Avatar';
import Dashboard from './components/Dashboard'

const Profile = () => {
//   const { username } = useAuth();

  return (
    // <ProtectedRoute>
      <div className='w-full h-[100svh] flex flex-col items-center'>
        <Avatar/>
        <Dashboard/>
      </div>
    // </ProtectedRoute>
  );
};

export default Profile;
