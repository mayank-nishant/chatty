import { useState } from "react";
import { Link } from "react-router";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import toast from "react-hot-toast";

import { useAuthStore } from "../store/useAuthStore.js";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer.jsx";

const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 100;

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.password) {
      return toast.error("All fields are required.");
    }

    if (formData.password.length < PASSWORD_MIN_LENGTH) {
      return toast.error(`Password must be at least ${PASSWORD_MIN_LENGTH} characters.`);
    }

    if (formData.password.length > PASSWORD_MAX_LENGTH) {
      return toast.error(`Password must not exceed ${PASSWORD_MAX_LENGTH} characters.`);
    }

    await signup(formData);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full h-full flex flex-col md:flex-row">
            {/* Left — form */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-3xl font-bold text-slate-200 mb-2">Create Account</h2>
                  <p className="text-slate-400">Sign up to get started</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="auth-input-label">
                      Full Name
                    </label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />
                      <input id="fullName" name="fullName" type="text" value={formData.fullName} onChange={handleChange} className="input" placeholder="John Doe" autoComplete="name" required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="auth-input-label">
                      Email
                    </label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="input" placeholder="johndoe@gmail.com" autoComplete="email" required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="auth-input-label">
                      Password
                    </label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} className="input" placeholder="Enter your password" autoComplete="new-password" required />
                    </div>
                  </div>

                  <button type="submit" className="auth-btn flex items-center justify-center" disabled={isSigningUp}>
                    {isSigningUp ? <LoaderIcon className="w-5 h-5 animate-spin" /> : "Create Account"}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/login" className="auth-link">
                    Already have an account? Login
                  </Link>
                </div>
              </div>
            </div>

            {/* Right — illustration */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img src="/signup.png" alt="People using mobile devices" className="w-full h-auto object-contain" />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">Start Your Journey Today</h3>
                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default SignUpPage;
