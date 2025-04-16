import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import api from "./axiosConfig";
import AuthForm from "./components/AuthForm";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import Home from "./components/Home";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setLoading(true);
      api
        .get("/tasks", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => setTasks(res.data))
        .catch(() => {
          setToken("");
          localStorage.removeItem("token");
        })
        .finally(() => setLoading(false));
    }
  }, [token]);

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    setTasks([]);
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar token={token} logout={logout} />
      <div className="flex-grow bg-gray-50 flex justify-center items-center">
        {/* Wrapper for consistent styling */}
        <div className="w-full max-w-4xl p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                !token ? (
                  <AuthForm setToken={setToken} />
                ) : (
                  <Navigate to="/tasks" />
                )
              }
            />
            <Route
              path="/tasks"
              element={
                token ? (
                  loading ? (
                    <div className="flex justify-center items-center h-screen">
                      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                    </div>
                  ) : (
                    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-8 px-4">
                      <h1 className="text-3xl font-bold text-blue-500 mb-6">
                        TO-DO List
                      </h1>
                      <TaskForm setTasks={setTasks} />
                      <TaskList tasks={tasks} setTasks={setTasks} />
                    </div>
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/profile"
              element={
                token ? <Profile token={token} /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
