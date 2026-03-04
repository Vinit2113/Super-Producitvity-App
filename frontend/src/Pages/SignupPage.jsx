import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
// Ensure these paths match your actual directory structure
import AuthLayout from "../Layouts/AuthLayout";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show a loading toast while the request is processing
    const loadingToastId = toast.loading("Initializing...");

    try {
      const { data } = await axios.post(
        `http://localhost:2102/user/create`,
        formData,
        { withCredentials: true }
      );
      console.log("Here is data ",data);
      

      // Inside your handleSubmit in SignupPage.jsx
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", formData.username);
      localStorage.setItem("userId", data.user.id); // Store the user's _id
      // Add this line
      // Dismiss the loading toast and show success

      toast.dismiss(loadingToastId);
      toast.success(data.message || "Welcome aboard!", {
        style: {
          borderRadius: "10px",
          background: "#18181b", // zinc-900
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#18181b",
        },
      });

      navigate("/");
    } catch (err) {
      toast.dismiss(loadingToastId);

      // Custom error toast styling to match the minimalist theme
      const errorToastOptions = {
        style: {
          borderRadius: "10px",
          background: "#fafafa", // zinc-50
          color: "#18181b", // zinc-900
          border: "1px solid #e4e4e7", // zinc-200
        },
      };

      if (err.response && err.response.data) {
        const backendError = err.response.data;

        // If multiple validation errors
        if (backendError.errors && Array.isArray(backendError.errors)) {
          backendError.errors.forEach((errorItem) => {
            toast.error(errorItem.message, {
              ...errorToastOptions,
              duration: 4000,
            });
          });
        }
        // If single error string
        else if (backendError.error) {
          toast.error(backendError.error, errorToastOptions);
        }
        // fallback
        else {
          toast.error("An error occurred during initialization.", errorToastOptions);
        }
      } else {
        toast.error("Network error. Please try again.", errorToastOptions);
      }
    }
  };

  return (
    <>
      {/* Configure Toaster defaults if you prefer global settings */}
      <Toaster
        position="top-right"
        toastOptions={{
          // You can put generic styles here if they apply to both success/error
          className: 'text-sm font-medium',
        }}
      />

      <AuthLayout title="Begin Anew" subtitle="Create your minimalist workspace.">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-zinc-900 transition-all duration-500 placeholder:text-zinc-300"
              required
            />

            {/* Username */}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-zinc-900 transition-all duration-500 placeholder:text-zinc-300"
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-zinc-900 transition-all duration-500 placeholder:text-zinc-300"
              required
            />

            {/* Password with Toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-zinc-900 transition-all duration-500 placeholder:text-zinc-300 pr-12"
                required
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
            Initialize
          </button>

          <p className="text-center text-[10px] uppercase tracking-widest text-zinc-400">
            Already a member?{" "}
            <Link to="/login" className="text-zinc-900 underline underline-offset-4 hover:text-zinc-700 transition-colors">
              Sign In
            </Link>
          </p>
        </form>
      </AuthLayout>
    </>
  );
};

export default SignupPage;