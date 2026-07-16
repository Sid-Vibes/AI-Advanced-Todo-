import React, { useState, useEffect } from 'react';
import { Sun, Moon, User, LogOut } from 'lucide-react';
import AddTaskForm from './AddTaskForm';
import TodoList from './TodoList';
import ProfilePage from './ProfilePage';
import PredictionPopup from './PredictionPopup';
import { useNavigate } from 'react-router-dom';



export default function Dashboard() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [showPredictionPopup, setShowPredictionPopup] = useState(false);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleNotification = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, notificationEnabled: !task.notificationEnabled } : task
    ));
  };

  const predictTask = async (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/predicts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: task.title })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPrediction(data.prediction);
        setShowPredictionPopup(true);
      } else {
        alert('Failed to get prediction. Please try again.');
      }
    } catch (error) {
      console.error('Prediction error:', error);
      alert('Error connecting to prediction service.');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logged out successfully!');
      localStorage.removeItem('token');
      navigate("/login");
    }
  };

  const activeTasks = tasks.filter(t => !t.completed);

  useEffect(() => {
    const checkNotifications = () => {
      const now = new Date();
      tasks.forEach(task => {
        if (task.notificationEnabled && !task.completed && task.dateTime > now) {
          const timeDiff = task.dateTime - now;
          // Notify around 1 minute before due time
          if (timeDiff >0 && timeDiff <= 1 * 60 * 1000) {
            if (Notification.permission === 'granted') {
              new Notification('Task Reminder', {
                body: `Your task "${task.title}" is due soon!`,
                icon: 'https://img.pikbest.com/wp/202413/alarm-clock-icon-abstract-vector-beautiful-design_10461247.jpg!sw800'
              });
            }
          }
        }
      });
    };

    // Request permission on mount
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Check every minute
    const interval = setInterval(checkNotifications, 60000);
    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 ${isDark ? 'bg-slate-800' : 'bg-white shadow-md'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              AiTodo Dashboard
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage your tasks efficiently
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-slate-900'
              }`}
            >
              <User size={20} />
              <span className="hidden sm:inline">Profile</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-red-500 hover:bg-red-600 text-white transition-colors"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Logout</span>
            </button>

            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600' : 'bg-gray-200 text-slate-900 hover:bg-gray-300'
              }`}
            >
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {showProfile ? (
          <ProfilePage isDark={isDark} onClose={() => setShowProfile(false)} tasks={tasks} user={user} />
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Add Task */}
            <div>
              <div className={`p-8 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white shadow-lg'}`}>
                <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Add New Task
                </h2>
                <AddTaskForm onAdd={addTask} isDark={isDark} />
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className={`p-6 rounded-2xl ${isDark ? 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-2 border-yellow-500' : 'bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-lg'}`}>
                  <h3 className={`text-sm font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Total Tasks
                  </h3>
                  <p className={`text-3xl font-bold text-yellow-500`}>
                    {tasks.length}
                  </p>
                </div>

                <div className={`p-6 rounded-2xl ${isDark ? 'bg-gradient-to-br from-green-500/20 to-green-600/20 border-2 border-green-500' : 'bg-gradient-to-br from-green-50 to-green-100 shadow-lg'}`}>
                  <h3 className={`text-sm font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Completed
                  </h3>
                  <p className={`text-3xl font-bold text-green-500`}>
                    {tasks.filter(t => t.completed).length}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Task List */}
            <div>
              <div className={`p-8 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white shadow-lg'}`}>
                <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Your Tasks ({activeTasks.length} active)
                </h2>
                <TodoList tasks={tasks} onDelete={deleteTask} onToggleComplete={toggleComplete} onToggleNotification={toggleNotification} onPredict={predictTask} isDark={isDark} />
              </div>
            </div>
          </div>
        )}

        {/* Prediction Popup */}
        {showPredictionPopup && prediction && (
          <PredictionPopup
            prediction={prediction}
            onClose={() => setShowPredictionPopup(false)}
            isDark={isDark}
          />
        )}
      </main>
    </div>
  );
}
