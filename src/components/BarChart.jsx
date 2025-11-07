import { useEffect, useState } from "react";
import {
  BarChart as BC,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const API_BASE = "http://localhost:8000/api";

export default function BarChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchUserStats() {
      try {
        const res = await fetch(`${API_BASE}/tasks/user-stats`);
        const stats = await res.json();

        // Transform and take only 4 employees (sorted by assigned or as returned)
        const formatted = stats
          .map((u) => ({
            name: u.name,
            completed: u.completed || 0,
            inProgress: u.inProgress || 0,
            open: u.open || 0,
            assigned: u.assigned || 0,
          }))
          .sort((a, b) => b.assigned - a.assigned) // Sort by most assigned
          .slice(0, 4); // ✅ Only top 4 users

        setData(formatted);
      } catch (err) {
        console.error("Error fetching bar chart data:", err);
      }
    }

    fetchUserStats();
  }, []);

  return (
    <div className="bg-[#12151b] rounded-2xl border border-gray-800 p-6">
      <h3 className="text-lg font-semibold mb-4">Task Progress (Top 4 Employees)</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BC data={data} barSize={45} barGap={8}> {/* ✅ Increased thickness */}
            <XAxis
              dataKey="name"
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
              interval={0}
            />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f1117",
                border: "1px solid #333",
                color: "#fff",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", color: "#fff" }} />
            <Bar dataKey="completed" fill="#22c55e" name="Completed" radius={[6, 6, 0, 0]} />
            <Bar dataKey="inProgress" fill="#3b82f6" name="In Progress" radius={[6, 6, 0, 0]} />
            <Bar dataKey="open" fill="#a855f7" name="Open" radius={[6, 6, 0, 0]} />
          </BC>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
