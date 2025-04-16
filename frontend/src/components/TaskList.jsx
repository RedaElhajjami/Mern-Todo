import React from "react";
import api from "../axiosConfig";

const TaskList = ({ tasks, setTasks }) => {
  const deleteTask = async (id) => {
    if (!id) {
      alert("ID de tâche invalide");
      return;
    }
    console.log(id);
    try {
      const response = await api.delete(`/tasks/${id}`);
      console.log("Delete response:", response);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
      alert(
        error.response?.data?.message ||
          "Erreur lors de la suppression de la tâche"
      );
    }
  };

  return (
    <ul className="w-full max-w-lg mx-auto mt-6 space-y-4">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <span className="text-gray-800 font-medium">{task.title}</span>
          <button
            onClick={() => deleteTask(task._id)}
            className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          >
            Supprimer
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
