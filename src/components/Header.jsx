import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-lg font-bold hover:text-gray-200">
          My Website
        </Link>
        <nav className="flex space-x-6">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/about" className="hover:text-gray-200">About</Link>
          <Link to="/contact" className="hover:text-gray-200">Contact</Link>
        </nav>
        <Link to="/login">
          <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100">
            Login
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;