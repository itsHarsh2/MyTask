import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        toast.success("Logged in successfully!");
        navigate('/dashboard');
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  // Handle Google OAuth - ADD THIS FUNCTION
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className="max-w-md mx-auto p-6 justify-items-center">
      <h2 className="text-2xl text-[#1E2A78] font-bold mb-4 text-center mt-20">Login to MyTask</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-[#1E2A78] text-white p-2 rounded hover:bg-[#1E2A78]/90 cursor-pointer"
        >
          Login
        </button>
      </form>

      {/* Google button OUTSIDE the form with proper click handler */}
      <button 
        type="button"
        onClick={handleGoogleLogin}
        className="flex items-center gap-2 border border-gray-300 p-2 w-full justify-center rounded cursor-pointer hover:bg-gray-50 transition-colors mt-4"
      >
        <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
        <span>Sign in with Google</span>
      </button>

      <p className="text-center mt-4 text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default Login;