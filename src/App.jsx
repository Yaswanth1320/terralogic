// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Overview from "./pages/Overview";
import Tasks from "./pages/Tasks";
import Insights from "./pages/Insights";
import Query from "./pages/Query";
import Settings from "./pages/Settings";
import ChatBot from "./pages/ChatBot";

function App() {
  return (
    <Router>
      <div className="bg-[#0a0d12] min-h-screen text-white">
        <Navbar />
        <div className="px-6">
          <Routes>
            <Route path="/" element={<Navigate to="/overview" />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/ai-insights" element={<Insights />} />
            <Route path="/status" element={<Query />} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

