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


  return (
    <div className="max-w-md mx-auto p-6 justify-items-center">
      <h2 className="text-2xl text-[#1E2A78] font-bold mb-4 text-center mt-20">Login to MyTask</h2>
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border  border-gray-300 p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border  border-gray-300 p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-[#1E2A78] text-white p-2 rounded hover:bg-[#1E2A78]/90 cursor-pointer"
        >
          Login
        </button>
      </form>
      <p className="text-center mt-4 text-sm text-gray-600">
  Already have an account?{' '}
  <Link to="/login" className="text-blue-600 hover:underline">
    Login up here
  </Link>
</p>

    </div>
  );
};

export default Login;
