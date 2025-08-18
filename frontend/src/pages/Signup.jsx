//Signup page
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

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

    // Normally send data to backend here
 
     try {
       const res = await fetch('http://localhost:5000/api/auth/signup', {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          name,
          email,
          password
        }),
       });

      const data = await res.json();
       
      if(data.success){
        toast.success('Signup sucessful!')
        navigate('/login')
      }
      else{
        toast.error(data.message || 'signup failed')
      }
     } catch (error) {
      toast.error('Error signing up');
      console.log(error)
     }

    // toast.success('Signup successful!');
    // navigate('/dashboard'); // ✅ Redirect to Dashboard after signup
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 mb-30">
      <h2 className="text-[#1E2A78] text-2xl font-bold mb-4 text-center ">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4 ">
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
          className="w-full border border-gray-300  p-2 rounded"
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
    </div>
  );
};

export default Signup;
