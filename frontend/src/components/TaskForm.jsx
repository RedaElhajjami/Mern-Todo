import React, { useState } from "react";
import api from "../axiosConfig";

const TaskForm = ({ setTasks }) => {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTask) return;
    try {
      const res = await api.post("/tasks", { title: newTask });
      setTasks((prev) => [...prev, res.data]);
      setNewTask("");
    } catch (error) {
      alert("Erreur lors de l'ajout de la tâche", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 mb-6 justify-center items-center w-full max-w-lg mx-auto"
    >
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Nouvelle tâche"
        required
        className="w-full sm:w-auto flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Ajouter
      </button>
    </form>
  );
};

export default TaskForm;
