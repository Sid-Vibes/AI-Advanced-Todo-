/*import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

const PredictionPopup = ({ prediction, onClose, isDark }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup with animation
    setTimeout(() => setIsVisible(true), 100);

    // Auto slide through messages if prediction has multiple parts
    const messages = prediction.split('. ').filter(msg => msg.trim());
    if (messages.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % messages.length);
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(interval);
    }
  }, [prediction]);

  const messages = prediction.split('. ').filter(msg => msg.trim());
  const currentMessage = messages[currentSlide] || prediction;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
      isVisible ? 'bg-black/50' : 'bg-black/0'
    }`}>
      <div className={`relative max-w-md w-full p-6 rounded-2xl shadow-2xl transform transition-all duration-500 ${
        isDark ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'
      } ${
        isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
      }`}>
        
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
            isDark ? 'hover:bg-slate-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
          }`}
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-yellow-500 rounded-full">
            <Sparkles size={24} className="text-white" />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              AI Prediction
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Task Analysis
            </p>
          </div>
        </div>

        
        <div className="mb-6">
          <div className={`p-4 rounded-lg transition-all duration-500 ${
            isDark ? 'bg-slate-700' : 'bg-gray-50'
          }`}>
            <p className={`text-sm leading-relaxed transition-all duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {currentMessage}
            </p>
          </div>

          
          {messages.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {messages.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-yellow-500' : isDark ? 'bg-gray-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

    
        <button
          onClick={onClose}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default PredictionPopup;


*/
import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

const PredictionPopup = ({ prediction, onClose, isDark }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Ensure prediction is always treated as a string
  const safePrediction = typeof prediction === "string" ? prediction : "";

  // Split into sentences (basic heuristic)
  const messages = safePrediction.split('. ').filter(msg => msg.trim());

  useEffect(() => {
    // Show popup with animation
    const timer = setTimeout(() => setIsVisible(true), 100);

    // Auto slide through messages if multiple parts
    if (messages.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % messages.length);
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(interval);
    }

    return () => clearTimeout(timer);
  }, [safePrediction]);

  const currentMessage = messages[currentSlide] || safePrediction;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'bg-black/50' : 'bg-black/0'
      }`}
    >
      <div
        className={`relative max-w-md w-full p-6 rounded-2xl shadow-2xl transform transition-all duration-500 ${
          isDark ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'
        } ${
          isVisible
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-95 opacity-0 translate-y-4'
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
            isDark ? 'hover:bg-slate-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
          }`}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-yellow-500 rounded-full">
            <Sparkles size={24} className="text-white" />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              AI Prediction
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Task Analysis
            </p>
          </div>
        </div>

        {/* Prediction content */}
        <div className="mb-6">
          <div
            className={`p-4 rounded-lg transition-all duration-500 ${
              isDark ? 'bg-slate-700' : 'bg-gray-50'
            }`}
          >
            <p
              className={`text-sm leading-relaxed transition-all duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              {currentMessage}
            </p>
          </div>

          {/* Slide indicators */}
          {messages.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {messages.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-yellow-500'
                      : isDark
                      ? 'bg-gray-600'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Action button */}
        <button
          onClick={onClose}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default PredictionPopup;