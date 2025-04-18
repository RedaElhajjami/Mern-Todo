import React from "react";
import api from "../axiosConfig";

const TaskList = ({ tasks, setTasks }) => {
  const deleteTask = async (id) => {
    if (!id) {
      alert("ID de tâche invalide");
      return;
    }

    // Show confirmation dialog
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?");
    if (!confirmDelete) {
      return; // Exit if the user cancels
    }

    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
      alert(
        error.response?.data?.message ||
          "Erreur lors de la suppression de la tâche"
      );
    }
  };

  const toggleCompleteTask = async (id) => {
    try {
      const updatedTask = await api.put(`/tasks/${id}/toggle-complete`);
      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.error("Toggle complete error:", error.response?.data || error.message);
      alert(
        error.response?.data?.message ||
          "Erreur lors de la mise à jour de la tâche"
      );
    }
  };

  return (
    <ul className="w-full max-w-lg mx-auto mt-6 space-y-4">
      {tasks.map((task) => (
        <li
          key={task._id}
          className={`flex justify-between items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${
            task.completed ? "bg-green-100" : "bg-gray-100"
          }`}
        >
          <span
            className={`text-gray-800 font-medium ${
              task.completed ? "line-through text-green-600" : ""
            }`}
          >
            {task.title}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => toggleCompleteTask(task._id)}
              className={`px-4 py-2 font-bold rounded-lg shadow-md transition duration-300 ${
                task.completed
                  ? "bg-yellow-500 text-white hover:bg-yellow-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {task.completed ? "Annuler" : "Compléter"}
            </button>
            <button
              onClick={() => deleteTask(task._id)}
              className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
            >
              Supprimer
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;