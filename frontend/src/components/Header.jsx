// src/components/Header.jsx
import { Link, NavLink, useLocation } from 'react-router-dom';
import Search from './Search.jsx'; // Import the new Search component

const Header = ({ searchQuery, setSearchQuery }) => {
  const location = useLocation();

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-2">
        
        {/* LEFT: Logo + NavLinks */}
        <div className="flex items-center space-x-8 w-full md:w-auto">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-[#1E2A78]">MyTask</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 ml-4">
            <NavLink to="/" className="text-gray-700 hover:text-[#1E2A78] font-medium transition">Home</NavLink>
            <NavLink to="/about" className="text-gray-700 hover:text-[#1E2A78] font-medium transition">About Us</NavLink>
            <NavLink to="/contact" className="text-gray-700 hover:text-[#1E2A78] font-medium transition">Contact Us</NavLink>
          </nav>
        </div>

        {/* CENTER: Search bar (only show on Dashboard page) */}
        {location.pathname === '/dashboard' && (
          <div className="w-full max-w-md md:mx-auto">
            {/* Replace the input with the Search component */}
            <Search 
              initialQuery={searchQuery}
              onSearch={setSearchQuery} 
            />
          </div>
        )}

        {/* RIGHT: Login & Signup */}
        <div className="flex items-center space-x-4">
          <NavLink to="/login" className="bg-[#1E2A78] text-white px-4 py-2 rounded hover:bg-[#17205d] transition gap-2">
            Login
          </NavLink>
          <NavLink to="/signup" className="text-gray-700 hover:text-blue-600 transition">
            Signup
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;