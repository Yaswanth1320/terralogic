import { useEffect, useState } from "react";
import {
  LineChart as LC,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const API_BASE = "http://localhost:8000/api";

export default function LineChart() {
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    async function fetchTrends() {
      try {
        const res = await fetch(`${API_BASE}/tasks/trends`);
        const data = await res.json();

        const formatted = data.map((t) => ({
          date: new Date(t.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          completed: t.tasksCompleted || 0,
          created: t.tasksCreated || 0,
          inProgress: t.tasksInProgress || 0,
        }));

        setTrendData(formatted);
      } catch (err) {
        console.error("Error fetching trend data:", err);
      }
    }

    fetchTrends();
  }, []);

  return (
    <div className="bg-[#12151b] rounded-2xl border border-gray-800 p-6">
      <h3 className="text-lg font-semibold mb-4">Task Activity Trend</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LC data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2c2f36" />
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f1117",
                border: "1px solid #333",
                color: "#fff",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", color: "#fff" }} />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#22c55e"
              strokeWidth={2}
              dot
              name="Completed"
            />
            <Line
              type="monotone"
              dataKey="created"
              stroke="#3b82f6"
              strokeWidth={2}
              dot
              name="Created"
            />
            <Line
              type="monotone"
              dataKey="inProgress"
              stroke="#a855f7"
              strokeWidth={2}
              dot
              name="In Progress"
            />
          </LC>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
