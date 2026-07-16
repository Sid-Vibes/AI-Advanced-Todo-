import React, { useState, useEffect } from 'react';
import { Sun, Moon, Facebook, Instagram, Youtube, Linkedin, CheckCircle, Zap, Target, BarChart, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Task Prioritization",
      description: "Let artificial intelligence analyze your tasks and suggest the optimal order based on deadlines, importance, and your work patterns.",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop"
    },
    {
      icon: Target,
      title: "Smart Goal Tracking",
      description: "Break down big goals into manageable tasks. Track your progress with visual analytics and celebrate milestones as you achieve them.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop"
    },
    {
      icon: BarChart,
      title: "Productivity Analytics",
      description: "Understand your work patterns with detailed insights. See when you're most productive and optimize your schedule accordingly.",
      image: "https://www.lystloc.com/blog/wp-content/uploads/2022/11/ezgif.com-gif-maker-8.webp"
    },
    {
      icon: Users,
      title: "Seamless Team Collaboration",
      description: "Share tasks, delegate work, and keep your entire team aligned. Real-time updates ensure everyone stays on the same page.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
    },
    {
      icon: Clock,
      title: "Time Management Tools",
      description: "Built-in timers, reminders, and scheduling features help you stay focused and make the most of every minute.",
      image: "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=800&h=600&fit=crop"
    },
    {
      icon: CheckCircle,
      title: "Notifications & Cross-Platform Sync",
      description: "Access your tasks anywhere, anytime. Seamlessly sync across all your devices - mobile, tablet, and desktop.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop"
    }
  ];
  
  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Theme Toggle Button - Fixed Position */}
      <button
        onClick={() => setIsDark(!isDark)}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full transition-colors ${
          isDark ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-white text-slate-900 hover:bg-gray-100 shadow-lg'
        }`}
      >
        {isDark ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl text-center">
          <h2 className={`text-6xl md:text-7xl font-bold mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Boost Your Productivity with AiTodo
          </h2>
          
          <p className={`text-xl md:text-2xl mb-12 ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
            Welcome to AiTodo, the AI-powered to-do list with advanced task management features and personalized recommendations. Sign up now to revolutionize your productivity!
          </p>
           <Link to="/register">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold text-xl px-12 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Started
          </button>
          </Link>
        </div>
      </section>

      {/* Why You Need AiTodo Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-5xl font-bold text-center mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Why You Need AiTodo
          </h2>
          <p className={`text-xl text-center mb-16 max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            In today's fast-paced world, staying organized isn't just helpful—it's essential. AiTodo transforms how you work, helping you achieve more with less stress.
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className={`p-8 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-white shadow-lg'}`}>
              <h3 className={`text-3xl font-bold mb-4 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                The Problem
              </h3>
              <ul className={`space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-700'} text-lg`}>
                <li>• Overwhelmed by endless to-do lists</li>
                <li>• Struggling to prioritize what matters most</li>
                <li>• Missing deadlines and important tasks</li>
                <li>• Wasting time on manual organization</li>
                <li>• Lack of visibility into productivity patterns</li>
                <li>• Poor team coordination and communication</li>
              </ul>
            </div>

            <div className={`p-8 rounded-xl ${isDark ? 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-2 border-yellow-500' : 'bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-lg'}`}>
              <h3 className={`text-3xl font-bold mb-4 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                The Solution
              </h3>
              <ul className={`space-y-4 ${isDark ? 'text-gray-200' : 'text-gray-800'} text-lg`}>
                <li>✓ AI automatically prioritizes your tasks</li>
                <li>✓ Smart recommendations based on your habits</li>
                <li>✓ Never miss a deadline with intelligent reminders</li>
                <li>✓ Automated organization saves hours weekly</li>
                <li>✓ Detailed analytics reveal productivity insights</li>
                <li>✓ Seamless collaboration keeps teams aligned</li>
              </ul>
            </div>
          </div>

          <div className={`text-center p-8 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-white shadow-lg'}`}>
            <h3 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              The Result: 3x More Productive
            </h3>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'} max-w-3xl mx-auto`}>
              Our users report completing 3 times more tasks per week, with 60% less stress. Join thousands of professionals who've transformed their productivity with AiTodo.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-5xl font-bold text-center mb-16 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Powerful Features That Drive Results
          </h2>
          
          <div className="space-y-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
                >
                  <div className="w-full md:w-1/2">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="rounded-xl shadow-2xl w-full h-80 object-cover"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className={`p-3 rounded-lg inline-block mb-4 ${isDark ? 'bg-yellow-500/20' : 'bg-yellow-100'}`}>
                      <Icon className="text-yellow-500" size={40} />
                    </div>
                    <h3 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {feature.title}
                    </h3>
                    <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}