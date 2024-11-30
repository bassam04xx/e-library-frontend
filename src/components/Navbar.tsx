'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Book, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const fullname=localStorage.getItem('user');
    if (token) {
      setIsAuthenticated(true);
      setUsername(fullname as string)
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user');
    
    
    setIsAuthenticated(false);
    setUsername('');
  };

  return (
    <nav className=" shadow-md bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              
              <h3 className=" font-bold tracking-tighter leading-none mb-4 ">
            E-Library
            <span className="text-yellow-400">X</span>
          </h3>            </Link>
          </div>
          <div className="flex items-center">
            {isAuthenticated && (
              <Link
                href="/books"
                className="text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-150 ease-in-out"
              >
                <Book className="h-5 w-5 mr-1" />
                Books
              </Link>
            )}
            {isAuthenticated ? (
              <div className="flex items-center ml-4">
                <span className="text-gray-300 mr-2 flex items-center">
                  <User className="h-5 w-5 mr-1" />
                  {username}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-150 ease-in-out"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <Link
                  href="/auth/signin"
                  className="text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="ml-2 bg-white text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

