import React from 'react';

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white shadow-md rounded-lg max-w-md">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">Welcome to MERN To-Do</h1>
        <p className="text-gray-700 mb-6">
          Organize your tasks and boost your productivity with our simple and efficient to-do app.
        </p>
        <a
          href="/tasks"
          className="bg-indigo-500 text-white px-6 py-3 rounded hover:bg-indigo-600 transition"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Home;