import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import AuthLayout from '../Layouts/AuthLayout';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Authenticating...");

    try {
      const { data } = await axios.post(
        'http://localhost:2102/user/login',
        { email, password },
        { withCredentials: true }
      );

      console.log("login data: ", data.user);


      // Persistence
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.user.username);
      localStorage.setItem("userId", data.user.id);

      toast.dismiss(loadingToastId);
      toast.success("Welcome back!", {
        style: { borderRadius: "10px", background: "#18181b", color: "#fff" },
      });

      navigate('/');
    } catch (err) {
      toast.dismiss(loadingToastId);
      const errorMessage = err.response?.data?.error || "Invalid credentials";

      toast.error(errorMessage, {
        style: {
          borderRadius: "10px",
          background: "#fafafa",
          color: "#18181b",
          border: "1px solid #e4e4e7",
        },
      });
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <AuthLayout title="Welcome Back" subtitle="Continue your journey.">
        <form className="space-y-8" onSubmit={handleLogin}>
          <div className="space-y-6">
            {/* Email Field */}
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-zinc-900 transition-all duration-500 placeholder:text-zinc-300"
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password Field with Toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="w-full bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-zinc-900 transition-all duration-500 placeholder:text-zinc-300 pr-12"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-zinc-900 text-white text-[11px] uppercase tracking-[0.3em] rounded-2xl hover:bg-zinc-800 transition-all cursor-pointer"
          >
            Enter Space
          </button>

          <p className="text-center text-[10px] uppercase tracking-widest text-zinc-400">
            New here? <Link to="/signup" className="text-zinc-900 underline underline-offset-4 hover:text-zinc-700 transition-colors">Create Account</Link>
          </p>
        </form>
      </AuthLayout>
    </>
  );
};

export default LoginPage;