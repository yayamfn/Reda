import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, ArrowLeft } from 'lucide-react';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin/dashboard');
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-8 left-8 text-gray-400 hover:text-white flex items-center gap-2"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Site
      </button>

      <div className="w-full max-w-md bg-surface border border-white/10 p-8 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Access</h1>
          <p className="text-gray-400">Enter your password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-background border border-white/10 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-600"
            />
            {error && <p className="text-red-500 text-sm mt-2">Invalid password</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 rounded-lg bg-primary hover:bg-red-600 text-white font-semibold transition-all duration-300"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;