import React, { useState } from 'react';
import { Clock, Trash2, Bell, BellOff, Sparkles } from 'lucide-react';
import { CheckCircle } from 'lucide-react';


const TodoList = ({ tasks, onDelete, onToggleComplete, onToggleNotification, onPredict, isDark }) => {
  if (tasks.length === 0) {
    return (
      <div className={`text-center py-12 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`}>
        <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          No tasks yet. Add your first task to get started!
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <div 
          key={task.id} 
          className={`flex justify-between items-center p-4 rounded-xl transition-all ${
            task.completed 
              ? isDark ? 'bg-green-900/20 border-2 border-green-500/30' : 'bg-green-50 border-2 border-green-200'
              : isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-white shadow-md hover:shadow-lg'
          }`}
        >
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={() => onToggleComplete(task.id)}
              className={`p-2 rounded-lg transition-colors ${
                task.completed
                  ? 'bg-green-500 text-white'
                  : isDark ? 'bg-slate-600 text-gray-400 hover:bg-slate-500' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
              }`}
            >
              <CheckCircle size={20} />
            </button>
            <button
              onClick={() => onToggleNotification(task.id)}
              className={`p-2 rounded-lg transition-colors ${
                task.notificationEnabled
                  ? 'bg-blue-500 text-white'
                  : isDark ? 'bg-slate-600 text-gray-400 hover:bg-slate-500' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
              }`}
            >
              {task.notificationEnabled ? <Bell size={20} /> : <BellOff size={20} />}
            </button>
            <div className="flex-1">
              <p className={`font-semibold mb-1 ${task.completed ? 'line-through' : ''} ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {task.title}
              </p>
              <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <Clock size={16} />
                <span>{task.dateTime.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 ml-4">
            <button
              onClick={() => onPredict(task.id)}
              className="p-2 rounded-lg transition-colors hover:bg-purple-500 hover:text-white text-purple-600"
              title="Get AI Prediction"
            >
              <Sparkles size={20} />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 rounded-lg transition-colors hover:bg-red-500 hover:text-white text-red-600"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;

