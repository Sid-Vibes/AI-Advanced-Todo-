import React, { useState } from 'react';
import { Sun, Moon, User, LogOut, Calendar, Plus, Trash2, Clock, Bell } from 'lucide-react';

const AddTaskForm = ({ onAdd, isDark }) => {
  const [title, setTitle] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const dateTimeRef = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dateTime) {
      alert('Please fill in all fields!');
      return;  
    }
    onAdd({
      id: Date.now().toString(),
      title,
      dateTime: new Date(dateTime),
      completed: false,
      notificationEnabled,
      createdAt: new Date()
    });
    setTitle('');
    setDateTime('');
    setNotificationEnabled(false);

  };

  const handleTitleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      dateTimeRef.current?.focus();
    }
  };

  const handleDateTimeKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };


  return (
    <div className="space-y-4 mb-8">
      <div>
        <label className={`block mb-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Task Title
        </label>
        <input 
          type="text" 
          placeholder="Enter task description" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={handleTitleKeyPress}
          className={`w-full px-4 py-3 rounded-lg transition-colors ${
            isDark 
              ? 'bg-slate-700 text-white placeholder-gray-400 focus:bg-slate-600' 
              : 'bg-gray-50 text-slate-900 placeholder-gray-500 border border-gray-300 focus:border-yellow-500 focus:bg-white'
          } outline-none`}
        />
      </div>

      <div>
        <label className={`block mb-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Date & Time
        </label>
        <div className="relative">
          <Calendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
          <input
            ref={dateTimeRef}
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            onKeyPress={handleDateTimeKeyPress}
            className={`w-full pl-12 pr-4 py-3 rounded-lg transition-colors ${
              isDark 
                ? 'bg-slate-700 text-white placeholder-gray-400 focus:bg-slate-600' 
                : 'bg-gray-50 text-slate-900 placeholder-gray-500 border border-gray-300 focus:border-yellow-500 focus:bg-white'
            } outline-none`}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="notification"
          checked={notificationEnabled}
          onChange={(e) => setNotificationEnabled(e.target.checked)}
          className="w-4 h-4 text-yellow-500 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2"
        />
        <label htmlFor="notification" className={`font-medium cursor-pointer ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          <Bell size={16} className="inline mr-2" />
          Enable Notifications
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        Add Task
      </button>
    </div>
  );
};
export default AddTaskForm;

