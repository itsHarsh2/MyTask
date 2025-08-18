import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import api, { getAuthHeaders } from '../api/axios.js';

const Dashboard = ({ searchQuery =''}) => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    datetime: '',
    recurrence: 'once',
    customRecurrence: ''
  });

  const [showCustomInput, setShowCustomInput] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks', { headers: getAuthHeaders() });
        setTasks(res.data);
      } catch (error) {
        toast.error('Error fetching tasks');
      }
    };
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (name === 'recurrence' && value === 'custom') {
      setShowCustomInput(true);
    } else if (name === 'recurrence') {
      setShowCustomInput(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.datetime) return;
    try {
      if (editIndex !== null) {
        const res = await api.put(`tasks/${editIndex}`, formData, { headers: getAuthHeaders() });
        const updatedTasks = tasks.map((task) =>
          task._id === editIndex ? res.data : task
        );
        setTasks(updatedTasks);
        toast.success('Task updated successfully!');
        setEditIndex(null);
      } else {
        const res = await api.post('/tasks', formData, { headers: getAuthHeaders() });
        setTasks([...tasks, res.data]);
        toast.success('Task added successfully!');
      }
      setFormData({ title: '', datetime: '', recurrence: 'once', customRecurrence: '' });
      setShowCustomInput(false);
    } catch (error) {
      toast.error('Error saving task');
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`, { headers: getAuthHeaders() });
      setTasks(tasks.filter((task) => task._id !== taskId));
      toast.success('Task deleted.');
    } catch (error) {
      toast.error('Error deleting task');
    }
  };

  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find((task) => task._id === taskId);
    if (!taskToEdit) return;
    setFormData(taskToEdit);
    setEditIndex(taskId);
    setShowCustomInput(taskToEdit.recurrence === 'custom');
  };

  // FILTER TASKS BY SEARCH QUERY
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mb-20">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-3xl font-bold text-[#1E2A78] mb-6">Welcome to MyTask Dashboard</h1>

      {/* Task Form */}
      <section className="bg-white border border-gray-300 p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4 text-[#1E2A78]">Add New Task</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1E2A78]"
          />
          <div className="flex gap-2">
            <input
              type="datetime-local"
              name="datetime"
              value={formData.datetime}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#1E2A78]"
            />
            <button
              type="button"
              className="bg-[#1E2A78] hover:bg-[#1E2A78]/90 text-white px-4 py-2 rounded cursor-pointer"
            >OK</button>
          </div>
          <select
            name="recurrence"
            value={formData.recurrence}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1E2A78]/90 "
          >
            <option value="once">Once</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="custom">Custom</option>
          </select>
          {showCustomInput && (
            <input
              type="text"
              name="customRecurrence"
              placeholder="e.g., Every 3rd of the month"
              value={formData.customRecurrence}
              onChange={handleChange}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1E2A78]/90 col-span-2"
            />
          )}
          <button
            type="submit"
            className="bg-[#1E2A78] hover:bg-[#1E2A78]/90 text-white py-2 rounded transition col-span-2 mb-5 cursor-pointer"
          >
            {editIndex !== null ? 'Update Task' : 'ADD'}
          </button>
        </form>
      </section>

      {/* Task List & Calendar */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-4 rounded shadow">
          <h3 className="text-lg font-medium mb-2 text-[#1E2A78]">Upcoming Tasks</h3>
          <ul className="space-y-2 text-sm">
            {filteredTasks.length === 0 ? (
              <li className="text-gray-600">No tasks found.</li>
            ) : (
              filteredTasks.map((task) => (
                <li key={task._id} className="bg-white p-2 rounded shadow flex justify-between items-start gap-4">
                  <div>
                    • {task.title} (
                    {task.recurrence === 'custom'
                      ? `${task.customRecurrence}`
                      : task.recurrence})  {new Date(task.datetime).toLocaleString()} 
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(task._id)}
                      className="text-blue-600 hover:underline text-sm"
                    >Edit</button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="text-red-500 hover:underline text-sm"
                    >Delete</button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="bg-white justify-items-center border border-gray-200 p-4 rounded-xl shadow">
          <h1 className="font-bold mb-2 text-[#1E2A78]">Calendar Preview</h1>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={({ date, view }) => {
              if (view === 'month') {
                const hasTask = tasks.some(task => {
                  const taskDate = new Date(task.datetime);
                  return taskDate.toDateString() === date.toDateString();
                });
                return hasTask ? 'bg-black text-white font-bold rounded-full' : null;
              }
            }}
            className="w-full justify-items-center rounded-xl border border-[#1E2A78]/30"
          />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
