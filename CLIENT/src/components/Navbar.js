import React, { useState } from 'react';
import logo from './Assets/logo.jpg';
import home from './Assets/home.png';
import add from './Assets/add-post.png';
import blog from './Assets/gallery.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext/index';
import { doSignOut } from '../firebase/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <header className="relative w-full border-b bg-white py-2">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          <div className="inline-flex items-center space-x-2">
        
            <a className="flex items-center">
              <img src={logo} className="h-7" />
              <span className="font-bold">Blogify</span>
            </a>
          </div>
          <div className="hidden lg:block">
            <ul className="inline-flex space-x-8">
              <li>
                <a
                  href="/"
                  className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  <img className="h-6" src={home} alt="" />
                </a>
              </li>
              <li>
                <a
                  href="/Add"
                  className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  <img className="h-6" src={add} alt="" />
                </a>
              </li>
              <li>
                <a
                  href="/cards"
                  className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  <img className="h-6" src={blog} alt="" />
                </a>
              </li>
            </ul>
          </div>

          <div className="hidden lg:block">
            {userLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    doSignOut().then(() => {
                      navigate('/login');
                    });
                  }}
                  className="rounded-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to={'/login'}
                  className="rounded-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="rounded-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Menu
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white py-2">
            <ul className="space-y-2 px-4">
              <hr  className='my-2'/>
              <li>
                <a
                  href="/"
                  className="block text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  <img className="h-6 inline" src={home} alt="" /> Home
                </a>
              </li>
              <hr  className='my-2'/>
              <li >

                <a
                  href="/Add"
                  className="block  text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  <img className="h-6 inline" src={add} alt="" /> Add Post
                </a>
              </li>
              <hr className='my-2'/>
              <li>
                <a
                  href="/cards"
                  className="block text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  <img className="h-6 inline" src={blog} alt="" /> Blog
                </a>
              </li>
              <hr className='my-2'/>
              <li>
                {userLoggedIn ? (
                  <button
                    onClick={() => {
                      doSignOut().then(() => {
                        navigate('/login');
                      });
                    }}
                    className="w-full rounded-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Log Out
                  </button>
                ) : (
                  <Link
                    to={'/login'}
                    className="block rounded-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
