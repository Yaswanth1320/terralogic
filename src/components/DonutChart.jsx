import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const API_BASE = "http://localhost:8000/api";

export default function DonutChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchStatusCounts() {
      try {
        // Fetch all tasks from backend and compute counts by status
        const res = await fetch(`${API_BASE}/tasks`);
        const tasks = await res.json();

        const counts = tasks.reduce((acc, t) => {
          acc[t.status] = (acc[t.status] || 0) + 1;
          return acc;
        }, {});

        const formatted = Object.entries(counts).map(([status, count]) => ({
          name: status.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          value: count,
        }));

        setData(formatted);
      } catch (err) {
        console.error("Error fetching donut chart data:", err);
      }
    }

    fetchStatusCounts();
  }, []);

  const COLORS = ["#3b82f6", "#22c55e", "#f97316", "#a855f7", "#ef4444"];

  return (
    <div className="bg-[#12151b] rounded-2xl border border-gray-800 p-6 flex flex-col items-center justify-center text-white">
      <h3 className="text-lg font-semibold mb-4 text-center">Tasks by Status</h3>

      <div className="w-full h-72 flex items-center justify-center">
        <ResponsiveContainer width="90%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={5}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {data.map((_, i) => (
                <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f1117",
                border: "1px solid #333",
                color: "#fff",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", color: "#fff" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
