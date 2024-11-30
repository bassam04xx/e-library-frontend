  import Link from 'next/link';
  import { Book, User } from 'lucide-react';
  import { getSession } from './actions';
  import LogoutButton from './LogoutButton'; // Import the client-side button

  export const dynamic = 'force-dynamic'; // Force dynamic rendering


  const Navbar = async () => {
    const { session, user } = await getSession();
    const isAuthenticated = Boolean(session);

    return (
      <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <span className="ml-2 text-white text-xl font-bold">E-Library</span>
              </Link>
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
                    {user}
                  </span>
                  <LogoutButton />
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
