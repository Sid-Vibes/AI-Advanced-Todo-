import React, { useState } from 'react';
import { Sun, Moon, Target, Users, Heart, Award, Zap, Shield, TrendingUp, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AiTodoAbout() {
  const [isDark, setIsDark] = useState(true);

  const values = [
    {
      icon: Target,
      title: "Focus on Results",
      description: "We believe in delivering tangible productivity improvements, not just features."
    },
    {
      icon: Users,
      title: "User-Centric Design",
      description: "Every decision we make starts with understanding our users' needs and challenges."
    },
    {
      icon: Heart,
      title: "Passion for Excellence",
      description: "We're committed to building the best task management experience possible."
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Your data privacy and security are our top priorities, always."
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "2M+", label: "Tasks Completed" },
    { number: "150+", label: "Countries" },
    { number: "99.9%", label: "Uptime" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      bio: "Former Google PM with 10+ years in productivity software"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "AI expert and MIT graduate specializing in machine learning"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      bio: "Award-winning UX designer passionate about intuitive interfaces"
    },
    {
      name: "David Kim",
      role: "Head of Engineering",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      bio: "Full-stack engineer who loves building scalable systems"
    }
  ];

  const timeline = [
    {
      year: "2023",
      title: "The Beginning",
      description: "AiTodo was founded with a simple mission: make productivity accessible to everyone through AI."
    },
    {
      year: "2024",
      title: "Rapid Growth",
      description: "Reached 50,000 active users and launched mobile apps for iOS and Android."
    },
    {
      year: "2024",
      title: "Team Collaboration",
      description: "Introduced team features, making AiTodo perfect for businesses and remote teams."
    },
    {
      year: "2025",
      title: "Global Expansion",
      description: "Expanded to 150+ countries with multi-language support and regional servers."
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Theme Toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        className={`fixed top-6 right-6 p-3 rounded-full transition-colors z-50 ${isDark ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-white text-slate-900 hover:bg-gray-100 shadow-lg'}`}
      >
        {isDark ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      {/* Hero Section */}
      <section className="pt-20 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              About AiTodo
            </h2>
            <p className={`text-2xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Empowering people to achieve more through intelligent task management
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center p-6 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-white shadow-lg'}`}>
                <div className="text-4xl font-bold text-yellow-500 mb-2">{stat.number}</div>
                <div className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Our Mission
              </h3>
              <p className={`text-xl mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                At AiTodo, we believe everyone deserves to work smarter, not harder. Our mission is to democratize productivity by combining artificial intelligence with intuitive design, making powerful task management accessible to everyone.
              </p>
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                We're not just building another to-do list app. We're creating an intelligent assistant that learns from you, adapts to your workflow, and helps you focus on what truly matters.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" 
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Vision */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop" 
                alt="Future vision"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Our Vision
              </h3>
              <p className={`text-xl mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                We envision a world where technology amplifies human potential. Where AI doesn't replace human decision-making but enhances it. Where productivity tools feel less like work and more like having a trusted partner by your side.
              </p>
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                By 2030, we aim to help 10 million people reclaim their time and achieve their goals through intelligent task management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className={`text-4xl font-bold text-center mb-16 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Our Core Values
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className={`p-6 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-white shadow-lg'} hover:scale-105 transition-transform`}>
                  <div className="p-3 bg-yellow-500 rounded-lg inline-block mb-4">
                    <Icon className="text-slate-900" size={32} />
                  </div>
                  <h4 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {value.title}
                  </h4>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h3 className={`text-4xl font-bold text-center mb-16 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Our Journey
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className={`absolute left-8 top-0 bottom-0 w-1 ${isDark ? 'bg-slate-700' : 'bg-gray-300'} hidden md:block`}></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className="relative md:pl-20">
                  {/* Timeline Dot */}
                  <div className="absolute left-5 top-2 w-7 h-7 bg-yellow-500 rounded-full border-4 border-slate-900 hidden md:block"></div>
                  
                  <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-white shadow-lg'}`}>
                    <div className="text-yellow-500 font-bold text-xl mb-2">{item.year}</div>
                    <h4 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {item.title}
                    </h4>
                    <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

     

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className={`max-w-5xl mx-auto text-center p-12 rounded-2xl ${isDark ? 'bg-gradient-to-br from-slate-800 to-slate-700' : 'bg-gradient-to-br from-yellow-50 to-yellow-100'}`}>
          <h3 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Join Us on This Journey
          </h3>
          <p className={`text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Be part of a community that's redefining productivity. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold text-lg px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Started Free
            </button>
            </Link>
            <Link to="/contact">
              <button className={`font-bold text-lg px-10 py-4 rounded-lg transition-all duration-300 ${isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-white hover:bg-gray-100 text-slate-900 border-2 border-gray-300'}`}>
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}