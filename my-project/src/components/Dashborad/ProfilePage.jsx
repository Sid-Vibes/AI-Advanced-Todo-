import React, { useEffect, useState } from 'react';
import { User, CheckCircle, XCircle, Activity } from 'lucide-react';


const ProfilePage = ({ isDark, onClose, tasks }) => {
  const [user, setUser] = useState(null);

useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/me", {
        method: "GET",
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
       // console.log(res);
        setUser(null);
        return;
      }
      const data = await res.json();
      setUser(data);
      // Cache user data in localStorage
      //console.log(data);
      localStorage.setItem("user_data", JSON.stringify(data));
      // Update access token if new one is provided
      if (data.new_access_token) {
        localStorage.setItem("access_token", data.new_access_token);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };

  // Check for cached user data first
  const cachedUser = localStorage.getItem("user_data");
  if (cachedUser) {
    setUser(JSON.parse(cachedUser));
  }

  fetchUser();
}, []);
   // console.log(user);
    

  const completedTasks = tasks.filter(t => t.completed);
  const pendingTasks = tasks.filter(t => !t.completed);
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;

  // Calculate productivity stats
  const today = new Date();
  const thisWeekTasks = tasks.filter(t => {
    const taskDate = new Date(t.createdAt);
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return taskDate >= weekAgo;
  });

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className={`p-8 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white shadow-lg'}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Profile
          </h2>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg font-medium ${
              isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-slate-900'
            }`}
          >
            Close
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <div className="w-24 h-24 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
            <User size={48} className="text-slate-900" />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {user ? user.fullName : 'Loading...'}
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
              {user ? user.email : ''}
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              Occupation: {user ? user.occupation : ''}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-4 rounded-xl text-center ${isDark ? 'bg-slate-700' : 'bg-gray-50'}`}>
            <p className="text-3xl font-bold text-yellow-500">{totalTasks}</p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Tasks</p>
          </div>
          <div className={`p-4 rounded-xl text-center ${isDark ? 'bg-slate-700' : 'bg-gray-50'}`}>
            <p className="text-3xl font-bold text-green-500">{completedTasks.length}</p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Completed</p>
          </div>
          <div className={`p-4 rounded-xl text-center ${isDark ? 'bg-slate-700' : 'bg-gray-50'}`}>
            <p className="text-3xl font-bold text-orange-500">{pendingTasks.length}</p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Pending</p>
          </div>
          <div className={`p-4 rounded-xl text-center ${isDark ? 'bg-slate-700' : 'bg-gray-50'}`}>
            <p className="text-3xl font-bold text-blue-500">{completionRate}%</p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Success Rate</p>
          </div>
        </div>
      </div>

      {/* Activity Stats */}
      <div className={`p-8 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white shadow-lg'}`}>
        <div className="flex items-center gap-3 mb-6">
          <Activity className="text-yellow-500" size={28} />
          <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Activity Overview
          </h3>
        </div>

        <div className="space-y-4">
          <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-700' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                This Week
              </span>
              <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {thisWeekTasks.length} tasks
              </span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all" 
                style={{ width: `${thisWeekTasks.length > 0 ? Math.min((thisWeekTasks.length / 20) * 100, 100) : 0}%` }}
              ></div>
            </div>
          </div>

          <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-700' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Completion Progress
              </span>
              <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {completionRate}%
              </span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all" 
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Completed Tasks */}
      <div className={`p-8 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white shadow-lg'}`}>
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="text-green-500" size={28} />
          <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Completed Tasks
          </h3>
        </div>
        
        {completedTasks.length === 0 ? (
          <p className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            No completed tasks yet
          </p>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {completedTasks.map(task => (
              <div key={task.id} className={`p-4 rounded-xl ${isDark ? 'bg-green-900/20 border border-green-500/30' : 'bg-green-50 border border-green-200'}`}>
                <p className={`font-semibold line-through mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {task.title}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Completed: {task.dateTime.toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pending Tasks */}
      <div className={`p-8 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white shadow-lg'}`}>
        <div className="flex items-center gap-3 mb-6">
          <XCircle className="text-orange-500" size={28} />
          <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Pending Tasks
          </h3>
        </div>
        
        {pendingTasks.length === 0 ? (
          <p className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            No pending tasks - Great job! 🎉
          </p>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {pendingTasks.map(task => (
              <div key={task.id} className={`p-4 rounded-xl ${isDark ? 'bg-orange-900/20 border border-orange-500/30' : 'bg-orange-50 border border-orange-200'}`}>
                <p className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {task.title}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Due: {task.dateTime.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;