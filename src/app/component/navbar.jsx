"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setHasToken(false);
    setIsMobileMenuOpen(false);
    window.location.href = "/"; 
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token); 
  }, []);

  return (
    <nav className="bg-gray-100 static">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div>
              <Link href="/" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                <svg
                  className="h-6 w-6 mr-1 text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                <span className="font-bold">Blogger</span>
              </Link>
            </div>

            {hasToken && (
              <div className="hidden md:flex items-center space-x-1">
                <Link href="/pages/blogs" className="py-5 px-3 text-gray-700 hover:text-gray-900">Blogs</Link>
                <Link href="/pages/profile" className="py-5 px-3 text-gray-700 hover:text-gray-900">Profile</Link>
                <Link href="/pages/add-blog" className="py-5 px-3 text-gray-700 hover:text-gray-900">Add Blog</Link>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {!hasToken ? (
              <>
                <Link href="/pages/login" className="py-5 px-3">Login</Link>
                <Link href="/pages/signup" className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300">
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}  
                className="py-5 px-3 text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu} className="mobile-menu-button">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu md:hidden">
          {hasToken ? (
            <>
              <Link href="/pages/blogs" className="block py-2 px-4 text-sm hover:bg-gray-200">Blogs</Link>
              <Link href="/pages/profile" className="block py-2 px-4 text-sm hover:bg-gray-200">Profile</Link>
              <Link href="/pages/add-blog" className="py-5 px-3 text-gray-700 hover:text-gray-900">Add Blog</Link>
              <button
                onClick={handleLogout}  // Call handleLogout function on click
                className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-200"
              >
                Logout
              </button>
              
            </>
          ) : (
            <>
              <Link href="/pages/login" className="block py-2 px-4 text-sm hover:bg-gray-200">Login</Link>
              <Link href="/pages/signup" className="block py-2 px-4 text-sm hover:bg-gray-200">Signup</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
