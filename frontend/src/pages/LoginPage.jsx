import { useState } from "react";
import { Link } from "react-router";
import { MessageCircleIcon, MailIcon, LoaderIcon, LockIcon, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

import { useAuthStore } from "../store/useAuthStore.js";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";

const PASSWORD_MIN_LENGTH = 6;

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { login, isLoggingIn } = useAuthStore();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      return toast.error("All fields are required.");
    }

    if (formData.password.length < PASSWORD_MIN_LENGTH) {
      return toast.error(`Password must be at least ${PASSWORD_MIN_LENGTH} characters.`);
    }

    await login(formData);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full h-full flex flex-col md:flex-row">
            {/* Left — form */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-700/40">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <div className="relative inline-flex">
                    <MessageCircleIcon className="w-12 h-12 text-cyan-400 mb-4" />
                    <div className="absolute inset-0 blur-2xl bg-cyan-400/20 rounded-full" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-100 mb-2">Welcome Back</h2>
                  <p className="text-slate-400">Login to continue your conversations</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="auth-input-label">
                      Email
                    </label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="johndoe@gmail.com" className="input" autoComplete="email" required />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="password" className="auth-input-label">
                        Password
                      </label>
                      <button type="button" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input id="password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="Enter your password" className="input pr-12" autoComplete="current-password" required />
                      <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors" aria-label={showPassword ? "Hide password" : "Show password"}>
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <button type="submit" disabled={isLoggingIn} className="auth-btn flex items-center justify-center gap-2">
                    {isLoggingIn ? (
                      <>
                        <LoaderIcon className="w-5 h-5 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/signup" className="auth-link">
                    Don&apos;t have an account? Sign Up
                  </Link>
                </div>
              </div>
            </div>

            {/* Right — illustration */}
            <div className="hidden md:flex md:w-1/2 items-center justify-center p-8 bg-gradient-to-bl from-slate-800/20 via-slate-900/10 to-transparent">
              <div className="max-w-lg">
                <img src="/login.png" alt="Login illustration" className="w-full h-auto object-contain drop-shadow-2xl" />
                <div className="mt-8 text-center">
                  <h3 className="text-2xl font-semibold text-cyan-400">Connect Anytime, Anywhere</h3>
                  <p className="mt-3 text-slate-400 leading-relaxed">Chat securely with friends and teams using a fast and modern messaging platform.</p>
                  <div className="mt-6 flex justify-center gap-3 flex-wrap">
                    <span className="auth-badge">Real-time Chat</span>
                    <span className="auth-badge">Secure</span>
                    <span className="auth-badge">Fast</span>
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

export default LoginPage;
