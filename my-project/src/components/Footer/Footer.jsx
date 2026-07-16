import React from 'react'
import { useState, useEffect } from 'react';
import { Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';  
import {Link} from 'react-router-dom';


function Footer() {
    const [isDark, setIsDark] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  return (
    <footer className={`py-12 ${isDark ? 'bg-slate-800/50' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center gap-12 mb-8">
            <Link to="/">
            <button 
              onClick={() => scrollToSection('home')}
              className={`font-semibold underline transition-colors ${isDark ? 'text-white hover:text-yellow-400' : 'text-slate-900 hover:text-yellow-600'}`}
            >
              Homepage
            </button>
            </Link>
            <Link to="/contact">
            <button 
              onClick={() => scrollToSection('contact')}
              className={`font-semibold transition-colors ${isDark ? 'text-yellow-400 hover:text-yellow-300' : 'text-yellow-600 hover:text-yellow-700'}`}
            >
              Contact
            </button>
             </Link>
             <Link to="/about">
            <button 
              onClick={() => scrollToSection('about')}
              className={`font-semibold transition-colors ${isDark ? 'text-yellow-400 hover:text-yellow-300' : 'text-yellow-600 hover:text-yellow-700'}`}
            >
              About
            </button>
            </Link>
          </div>
          
          <div className="flex justify-center gap-6 mb-8">
            {[
              { Icon: Facebook, label: 'Facebook' },
              { Icon: Instagram, label: 'Instagram' },
              { Icon: Youtube, label: 'YouTube' },
              { Icon: Linkedin, label: 'LinkedIn' }
            ].map(({ Icon, label }) => (
              <button
                key={label}
                className={`p-3 rounded-full transition-colors ${
                  isDark ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-slate-700'
                }`}
                aria-label={label}
              >
                <Icon size={24} />
              </button>
            ))}
          </div>
          
          <p className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            © All rights reserved.
          </p>
        </div>
      </footer>
  );    
}

export default Footer