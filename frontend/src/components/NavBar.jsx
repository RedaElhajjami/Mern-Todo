import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ token, logout }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-emerald-700 text-white px-4 py-3 shadow-md rounded-lg fixed w-full z-10 border-black border-2">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">MERN To-Do</Link>
        </h1>
        <div className="flex items-center space-x-4">
          {token ? (
            <>
              <Link to="/tasks" className="hover:underline">
                Tasks
              </Link>
              <Link to="/profile" className="hover:underline">
                Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;