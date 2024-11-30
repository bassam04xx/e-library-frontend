'use client';

import { LogOut } from 'lucide-react';
import { deleteSession } from './actions';

const LogoutButton = () => {

  const handleLogout = async() => {
    await deleteSession();
    window.location.href = '/auth/signin';
  };

  return (
    <button
      onClick={handleLogout}
      className="text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-150 ease-in-out"
    >
      <LogOut className="h-5 w-5 mr-1" />
      Logout
    </button>
  );
};

export default LogoutButton;