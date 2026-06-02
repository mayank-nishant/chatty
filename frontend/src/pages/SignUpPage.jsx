import { useState } from "react";

import { Link } from "react-router-dom";

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

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ================= HANDLE SUBMIT =================
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
    <div
      className="
        w-full
        min-h-screen
        
        flex items-center justify-center
        
        p-4
      "
    >
      <div
        className="
          relative
          
          w-full
          max-w-6xl
          
          min-h-[650px]
          h-[90vh]
          max-h-[850px]
        "
      >
        <BorderAnimatedContainer>
          <div
            className="
              w-full h-full
              
              flex flex-col md:flex-row
            "
          >
            {/* ================= LEFT SIDE ================= */}
            <div
              className="
                md:w-1/2
                
                p-6 md:p-10
                
                flex items-center justify-center
                
                md:border-r
                border-slate-700/40
              "
            >
              <div className="w-full max-w-md">
                {/* HEADER */}
                <div className="text-center mb-8">
                  <MessageCircleIcon
                    className="
                      size-12
                      mx-auto
                      mb-4
                      
                      text-cyan-400
                    "
                  />

                  <h2
                    className="
                      text-3xl
                      font-bold
                      
                      text-slate-100
                    "
                  >
                    Create Account
                  </h2>

                  <p
                    className="
                      mt-2
                      text-slate-400
                    "
                  >
                    Sign up to get started
                  </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* FULL NAME */}
                  <div>
                    <label htmlFor="fullName" className="auth-input-label">
                      Full Name
                    </label>

                    <div className="relative">
                      <UserIcon className="auth-input-icon" />

                      <input id="fullName" name="fullName" type="text" value={formData.fullName} onChange={handleChange} className="input" placeholder="John Doe" autoComplete="name" required />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label htmlFor="email" className="auth-input-label">
                      Email
                    </label>

                    <div className="relative">
                      <MailIcon className="auth-input-icon" />

                      <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="input" placeholder="johndoe@gmail.com" autoComplete="email" required />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label htmlFor="password" className="auth-input-label">
                      Password
                    </label>

                    <div className="relative">
                      <LockIcon className="auth-input-icon" />

                      <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} className="input" placeholder="Enter your password" autoComplete="new-password" required />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    className="
                      auth-btn
                      
                      flex items-center
                      justify-center
                    "
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <LoaderIcon
                        className="
                          size-5
                          animate-spin
                        "
                      />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                {/* LOGIN LINK */}
                <div className="mt-6 text-center">
                  <Link to="/login" className="auth-link">
                    Already have an account? Login
                  </Link>
                </div>
              </div>
            </div>

            {/* ================= RIGHT SIDE ================= */}
            <div
              className="
                hidden
                md:flex
                
                md:w-1/2
                
                items-center justify-center
                
                p-6
                
                bg-gradient-to-bl
                from-slate-800/20
                to-transparent
              "
            >
              <div className="text-center">
                <img
                  src="/signup.png"
                  alt="Signup Illustration"
                  className="
                    w-[85%]
                    mx-auto
                    
                    h-auto
                    
                    object-contain
                  "
                />

                <div className="mt-6">
                  <h3
                    className="
                      text-2xl
                      font-semibold
                      
                      text-cyan-400
                    "
                  >
                    Start Your Journey Today
                  </h3>

                  <div
                    className="
                      mt-4
                      
                      flex justify-center
                      gap-3
                    "
                  >
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
