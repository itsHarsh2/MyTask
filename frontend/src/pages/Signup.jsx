import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

 
  const signupUrl = `${import.meta.env.VITE_API_BASE_URL}/auth/signup`|| 'http://localhost:5000/api/auth/signup';
  const googleAuthUrl = import.meta.env.VITE_GOOGLE_AUTH_URL || 'http://localhost:5000/auth/google';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const res = await fetch(signupUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password
        }),
      });

      const data = await res.json();
       
      if (data.success) {
        toast.success('Signup successful!');
        navigate('/login');
      } else {
        toast.error(data.message || 'Signup failed');
      }
    } catch (error) {
      toast.error('Error signing up');
      console.log(error);
    }
  };

  // Handle Google OAuth with env
  const handleGoogleSignup = () => {
    window.location.href = googleAuthUrl;
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 mb-30">
      <h2 className="text-[#1E2A78] text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-[#1E2A78] text-white p-2 rounded hover:bg-[#1E2A78]/90 cursor-pointer"
        >
          Sign Up
        </button>
      </form>

      {/* Google button OUTSIDE the form with env handler */}
      <button 
        type="button"
        onClick={handleGoogleSignup}
        className="flex items-center gap-2 border border-gray-300 p-2 w-full justify-center rounded cursor-pointer hover:bg-gray-50 transition-colors mt-4"
      >
        <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
        <span>Sign up with Google</span>
      </button>

      <p className="text-center mt-4 text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Signup;
