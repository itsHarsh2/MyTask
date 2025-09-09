import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; 
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import AuthSuccess from './components/AuthSucess';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Toaster position="top-right" reverseOrder={false} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/signup" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard"
             element={<Dashboard searchQuery={searchQuery} />} />
               <Route path="/auth/success" element={<AuthSuccess />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
