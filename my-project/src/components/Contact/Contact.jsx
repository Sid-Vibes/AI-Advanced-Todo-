import React, { useState } from 'react';
import { Sun, Moon, MessageSquare, Star, ThumbsUp, ThumbsDown, AlertCircle, Lightbulb, Bug } from 'lucide-react';

export default function AiTodoFeedback() {
  const [isDark, setIsDark] = useState(true);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const feedbackTypes = [
    { id: 'general', label: 'General Feedback', icon: MessageSquare, color: 'blue' },
    { id: 'bug', label: 'Bug Report', icon: Bug, color: 'red' },
    { id: 'feature', label: 'Feature Request', icon: Lightbulb, color: 'yellow' },
    { id: 'positive', label: 'Positive', icon: ThumbsUp, color: 'green' },
    { id: 'negative', label: 'Negative', icon: ThumbsDown, color: 'orange' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields!');
      return;
    }
    
    if (rating === 0) {
      alert('Please provide a rating!');
      return;
    }
    
    alert(`Thank you for your feedback, ${formData.name}! We appreciate your input.`);
    console.log('Feedback data:', { ...formData, rating, feedbackType });
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    setRating(0);
    setFeedbackType('general');
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

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-start">
        {/* Left Side - Info & Testimonials */}
        <div className="hidden md:block">
          <div className={`p-12 rounded-2xl ${isDark ? 'bg-gradient-to-br from-slate-800 to-slate-700' : 'bg-gradient-to-br from-yellow-50 to-yellow-100'}`}>
            <h1 className={`text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              AiTodo
            </h1>
            <p className={`text-2xl mb-8 ${isDark ? 'text-yellow-400' : 'text-yellow-600'} font-semibold`}>
              We Value Your Feedback
            </p>
            <p className={`text-lg mb-10 ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
              Your thoughts and suggestions help us build a better product. Whether it's a bug report, feature request, or just a note to say hello - we'd love to hear from you!
            </p>
            
            <div className="space-y-6">
              <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-700/50' : 'bg-white/80'}`}>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className={`mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'} italic`}>
                  "AiTodo has completely transformed how I manage my daily tasks. The AI recommendations are spot-on!"
                </p>
                <p className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  - Sarah M., Product Manager
                </p>
              </div>

              <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-700/50' : 'bg-white/80'}`}>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className={`mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'} italic`}>
                  "The team collaboration features are incredible. Our productivity has increased by 300%!"
                </p>
                <p className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  - Michael C., Team Lead
                </p>
              </div>

              <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-700/50' : 'bg-white/80'}`}>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className={`mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'} italic`}>
                  "Simple, intuitive, and powerful. Everything a productivity app should be!"
                </p>
                <p className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  - Emily R., Designer
                </p>
              </div>
            </div>

            <div className={`mt-8 p-6 rounded-xl border-2 ${isDark ? 'border-yellow-500/30 bg-yellow-500/10' : 'border-yellow-500 bg-yellow-50'}`}>
              <div className="flex items-start gap-3">
                <AlertCircle className="text-yellow-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Quick Response Time
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    We typically respond to all feedback within 24-48 hours. Urgent issues are prioritized.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Feedback Form */}
        <div className={`p-8 md:p-12 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white shadow-2xl'}`}>
          {/* Mobile Logo */}
          <div className="md:hidden mb-6">
            <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              AiTodo
            </h1>
          </div>

          <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Share Your Feedback
          </h2>
          <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Help us improve AiTodo by sharing your thoughts
          </p>

          <div className="space-y-6">
            {/* Feedback Type Selection */}
            <div>
              <label className={`block mb-3 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Feedback Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {feedbackTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setFeedbackType(type.id)}
                      className={`p-4 rounded-lg transition-all ${
                        feedbackType === type.id
                          ? 'bg-yellow-500 text-slate-900 shadow-lg scale-105'
                          : isDark 
                            ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-xs font-semibold">{type.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className={`block mb-3 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Overall Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      size={40}
                      className={`${
                        star <= (hoveredRating || rating)
                          ? 'fill-yellow-500 text-yellow-500'
                          : isDark ? 'text-gray-600' : 'text-gray-300'
                      } transition-colors`}
                    />
                  </button>
                ))}
                {rating > 0 && (
                  <span className={`ml-3 text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {rating}/5
                  </span>
                )}
              </div>
            </div>

            {/* Name Field */}
            <div>
              <label className={`block mb-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-4 py-4 rounded-lg transition-colors ${
                  isDark 
                    ? 'bg-slate-700 text-white placeholder-gray-400 focus:bg-slate-600' 
                    : 'bg-gray-50 text-slate-900 placeholder-gray-500 border border-gray-300 focus:border-yellow-500 focus:bg-white'
                } outline-none`}
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className={`block mb-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-4 rounded-lg transition-colors ${
                  isDark 
                    ? 'bg-slate-700 text-white placeholder-gray-400 focus:bg-slate-600' 
                    : 'bg-gray-50 text-slate-900 placeholder-gray-500 border border-gray-300 focus:border-yellow-500 focus:bg-white'
                } outline-none`}
                required
              />
            </div>

            {/* Subject Field */}
            <div>
              <label className={`block mb-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Subject <span className={`text-sm font-normal ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="Brief summary of your feedback"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className={`w-full px-4 py-4 rounded-lg transition-colors ${
                  isDark 
                    ? 'bg-slate-700 text-white placeholder-gray-400 focus:bg-slate-600' 
                    : 'bg-gray-50 text-slate-900 placeholder-gray-500 border border-gray-300 focus:border-yellow-500 focus:bg-white'
                } outline-none`}
              />
            </div>

            {/* Message Field */}
            <div>
              <label className={`block mb-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Your Feedback <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Tell us what you think..."
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={6}
                className={`w-full px-4 py-4 rounded-lg transition-colors resize-none ${
                  isDark 
                    ? 'bg-slate-700 text-white placeholder-gray-400 focus:bg-slate-600' 
                    : 'bg-gray-50 text-slate-900 placeholder-gray-500 border border-gray-300 focus:border-yellow-500 focus:bg-white'
                } outline-none`}
                required
              />
              <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                Please be as detailed as possible. The more information you provide, the better we can help.
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold text-lg py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Submit Feedback
            </button>

            {/* Privacy Note */}
            <p className={`text-xs text-center ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              We respect your privacy. Your feedback will only be used to improve AiTodo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}