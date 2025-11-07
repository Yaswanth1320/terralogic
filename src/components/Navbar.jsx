// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import { ChevronDown, User } from "lucide-react";

export default function Navbar() {
  const links = [
    { name: "Overview", path: "/overview" },
    { name: "Tasks", path: "/tasks" },
    { name: "AI Insights", path: "/ai-insights" },
    { name: "Status", path: "/status" },
    {name: "Query", path: "/chatbot"},
    { name: "Settings", path: "/settings" },
  ];

  return (
    <header className="bg-[#0f1117] border-b border-gray-800 text-white">
      {/* Top Section */}
      <div className="flex justify-between items-center px-8 py-6">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center font-bold">
            <span className="text-xs">P</span>
          </div>
          <h1 className="text-lg font-semibold tracking-wide">TERRALOGIC</h1>
        </div>

        {/* Right: Date + User */}
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-[#141821] px-3 py-1.5 rounded-full text-sm border border-gray-700 hover:border-gray-600 transition">
            <span>Today</span>
            <ChevronDown size={14} />
          </button>

          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition">
            <User size={18} />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex items-center space-x-8 px-8 py-4 border-t border-gray-800">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `relative text-sm font-medium px-3 py-2 rounded-full transition-all duration-300
              ${
                isActive
                  ? "text-blue-400 bg-blue-500/20  border-blue-500"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/60"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
