import React, { useState } from 'react';
import { Sun, Moon, Mail, Lock, User, Eye, EyeOff, Phone, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AiTodoRegister() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    occupation: '',
    agreeTerms: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/register", formData);
      console.log(response.data);
      navigate('/login');
      alert("User registered successfully!");
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error);
    }
    
    if (!formData.fullName || !formData.email || !formData.password) {
      alert('Please fill in all required fields!');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (!formData.agreeTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy!');
      return;
    }
    
    alert(`Registration successful for: ${formData.fullName}!`);
    console.log('Form data:', formData);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 py-12 ${isDark ? 'bg-slate-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Theme Toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        className={`fixed top-6 right-6 p-3 rounded-full transition-colors z-50 ${isDark ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-white text-slate-900 hover:bg-gray-100 shadow-lg'}`}
      >
        {isDark ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding & Benefits */}
        <div className="hidden md:block">
          <div className={`p-12 rounded-2xl ${isDark ? 'bg-gradient-to-br from-slate-800 to-slate-700' : 'bg-gradient-to-br from-yellow-50 to-yellow-100'}`}>
            <h1 className={`text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              AiTodo
            </h1>
            <p className={`text-2xl mb-8 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
              Start Your Productivity Journey Today
            </p>
            <p className={`text-lg mb-10 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Join thousands of users who have transformed their workflow with AI-powered task management.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-yellow-500 rounded-lg flex-shrink-0">
                  <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className={`font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Free Forever Plan
                  </h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Start with our free plan and upgrade anytime
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-yellow-500 rounded-lg flex-shrink-0">
                  <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className={`font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    AI-Powered Assistance
                  </h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Smart task prioritization and personalized recommendations
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-yellow-500 rounded-lg flex-shrink-0">
                  <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className={`font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Enterprise-Grade Security
                  </h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Your data is encrypted and protected 24/7
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-yellow-500 rounded-lg flex-shrink-0">
                  <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className={`font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    24/7 Customer Support
                  </h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    We're here to help whenever you need us
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className={`p-8 md:p-12 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white shadow-2xl'}`}>
          {/* Mobile Logo */}
          <div className="md:hidden mb-6">
            <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              AiTodo
            </h1>
          </div>

          <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Create Your Account
          </h2>
          <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Start boosting your productivity in minutes
          </p>

          <div className="space-y-5">
            {/* Full Name Field */}
            <div>
              <label className={`block mb-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
                <input
                  type="text"
                  placeholder="Username"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-lg transition-colors ${
                    isDark 
                      ? 'bg-slate-700 text-white placeholder-gray-400 focus:bg-slate-600' 
                      : 'bg-gray-50 text-slate-900 placeholder-gray-500 border border-gray-300 focus:border-yellow-500 focus:bg-white'
                  } outline-none`}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className={`block mb-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-lg transition-colors ${
                    isDark 
                      ? 'bg-slate-700 text-white placeholder-gray-400 focus:bg-slate-600' 
                      : 'bg-gray-50 text-slate-900 placeholder-gray-500 border border-gray-300 focus:border-yellow-500 focus:bg-white'
                  } outline-none`}
                  required
                />
              </div>
            </div>

            {/* Phone Number Field */}
            <div>
              <label className={`block mb-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Phone Number <span className={`text-sm font-normal ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>(Optional)</span>
              </label>
              <div className="relative">
                <Phone className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
                <input
                  type="tel"
                  placeholder="+91 XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-lg transition-colors ${
                    isDark 
                      ? 'bg-slate-700 text-white placeholder-gray-400 focus:bg-slate-600' 
                      : 'bg-gray-50 text-slate-900 placeholder-gray-500 border border-gray-300 focus:border-yellow-500 focus:bg-white'
                  } outline-none`}
                />
              </div>
            </div>

            {/* Occupation Field */}
            <div>
              <label className={`block mb-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Occupation <span className={`text-sm font-normal ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>(Optional)</span>
              </label>
              <div className="relative">
                <Briefcase className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
                <input
                  type="text"
                  placeholder="Software Developer, Student, etc."
                  value={formData.occupation}
                  onChange={(e) => handleInputChange('occupation', e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-lg transition-colors ${
                    isDark 
                      ? 'bg-slate-700 text-white placeholder-gray-400 focus:bg-slate-600' 
                      : 'bg-gray-50 text-slate-900 placeholder-gray-500 border border-gray-300 focus:border-yellow-500 focus:bg-white'
                  } outline-none`}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className={`block mb-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full pl-12 pr-12 py-4 rounded-lg transition-colors ${
                    isDark 
                      ? 'bg-slate-700 text-white placeholder-gray-400 focus:bg-slate-600' 
                      : 'bg-gray-50 text-slate-900 placeholder-gray-500 border border-gray-300 focus:border-yellow-500 focus:bg-white'
                  } outline-none`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                Must be at least 8 characters long
              </p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className={`block mb-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`w-full pl-12 pr-12 py-4 rounded-lg transition-colors ${
                    isDark 
                      ? 'bg-slate-700 text-white placeholder-gray-400 focus:bg-slate-600' 
                      : 'bg-gray-50 text-slate-900 placeholder-gray-500 border border-gray-300 focus:border-yellow-500 focus:bg-white'
                  } outline-none`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500 cursor-pointer"
              />
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                I agree to the <button type="button" className="text-yellow-500 hover:text-yellow-400 font-medium underline">Terms of Service</button> and <button type="button" className="text-yellow-500 hover:text-yellow-400 font-medium underline">Privacy Policy</button>
              </span>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold text-lg py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg mt-6"
            >
              Create Account
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className={`absolute inset-0 flex items-center`}>
                <div className={`w-full border-t ${isDark ? 'border-slate-700' : 'border-gray-300'}`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-4 ${isDark ? 'bg-slate-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                  Or sign up with
                </span>
              </div>
            </div>

            {/* Social Registration Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button className={`flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${
                isDark 
                  ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-slate-900 border border-gray-300'
              }`}>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button className={`flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${
                isDark 
                  ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-slate-900 border border-gray-300'
              }`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </button>
            </div>

            {/* Login Link */}
            <p className={`text-center text-sm pt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Already have an account? 
              <Link to="/login">
                <button type="button" className="text-yellow-500 hover:text-yellow-400 font-semibold">Log in</button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
