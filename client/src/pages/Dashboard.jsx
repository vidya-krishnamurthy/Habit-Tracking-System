// Dashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar1 from "../components/Navbar1";
import "./dash.css";
import Confetti from "react-confetti";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [completedHabits, setCompletedHabits] = useState([]);
  const [pendingHabits, setPendingHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUserName(userData.name);
      // Fetch habits for the logged-in user
      const fetchHabits = async () => {
        try {
          const [completedRes, pendingRes] = await Promise.all([
            axios.get(`https://habit-tracking-system-kohl.vercel.app/habits/completed?userId=${userData.id}`),
            axios.get(`https://habit-tracking-system-kohl.vercel.app/habits/pending?userId=${userData.id}`),
          ]);
          setCompletedHabits(completedRes.data);
          setPendingHabits(pendingRes.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching habits:", error);
          setLoading(false);
        }
      };
      fetchHabits();
    } else {
      setLoading(false);
    }
  }, []);

  const handleCompleteHabit = async (habit) => {
    try {
      // Mark the habit as completed by sending it to the /habit/completed endpoint.
      await axios.post("https://habit-tracking-system-kohl.vercel.app/habit/completed", habit);
      
      // Update the UI by moving the habit from pending to completed.
      setCompletedHabits([...completedHabits, habit]);
      setPendingHabits(pendingHabits.filter(h => h._id !== habit._id));

      // Show confetti for celebration.
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    } catch (error) {
      console.error("Error completing habit:", error);
    }
  };

  return (
    <div className={`dashboard-container ${darkMode ? "dark-mode" : ""}`}>
      <Navbar1 />
      {showConfetti && <Confetti />}

      <div className="profile-card">
        <h2>Welcome, {userName || "Guest"}! 👋</h2>
        <p className="quote">"Stay consistent, and success will follow!"</p>
      </div>

      <div className="search-bar">
        <input 
          type="text" 
          placeholder="🔍 Search habits..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

      <div className="habits-wrapper">
        {/* Completed Habits Section */}
        <div className="habits-container completed-habits">
          <h2>Completed Habits ✅</h2>
          {loading ? (
            <p>Loading...</p>
          ) : completedHabits.length === 0 ? (
            <p>No completed habits.</p>
          ) : (
            <ul>
              {completedHabits
                .filter(habit => habit.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((habit) => (
                  <li key={habit._id} className="habit-card completed">
                    {habit.name}
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* Pending Habits Section */}
        <div className="habits-container pending-habits">
          <h2>Pending Habits ⏳</h2>
          {loading ? (
            <p>Loading...</p>
          ) : pendingHabits.length === 0 ? (
            <p>No pending habits.</p>
          ) : (
            <ul>
              {pendingHabits
                .filter(habit => habit.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((habit) => (
                  <li 
                    key={habit._id} 
                    className="habit-card pending" 
                    onClick={() => handleCompleteHabit(habit)}
                  >
                    {habit.name} 
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
