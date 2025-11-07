import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
} from "recharts";

const API_BASE = "http://localhost:8000/api";
const COLORS = ["#a855f7", "#3b82f6", "#fbbf24", "#22c55e", "#ef4444"];

export default function Tasks() {
  const [userStats, setUserStats] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    async function load() {
      try {
        const [statsRes, tasksRes] = await Promise.all([
          fetch(`${API_BASE}/tasks/user-stats`),
          fetch(`${API_BASE}/tasks`),
        ]);
        const statsData = await statsRes.json();
        const tasks = await tasksRes.json();

        const enhanced = statsData.map((u) => {
          const trend =
            u.assigned > 0 ? Math.round((u.completed / u.assigned) * 100) : 0;
          return { ...u, trend };
        });

        setUserStats(enhanced);
        setTaskData(tasks);
      } catch (err) {
        console.error("Error loading data", err);
      }
    }
    load();
  }, []);

  const filtered = userStats.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const visible = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // 📊 Tasks by Project
  const projectStats = (() => {
    const counts = {};
    for (const t of taskData) {
      if (!t.project?.name) continue;
      counts[t.project.name] = (counts[t.project.name] || 0) + 1;
    }
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  })();

  // 🚨 Open Issues by Project
  const openIssues = (() => {
    const counts = {};
    for (const t of taskData.filter((x) => x.status === "open")) {
      if (!t.project?.name) continue;
      counts[t.project.name] = (counts[t.project.name] || 0) + 1;
    }
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  })();

  const getTrendStyle = (trend) => {
    if (trend >= 50) return { color: "#22c55e", symbol: "▲" };
    if (trend >= 25) return { color: "#fbbf24", symbol: "→" };
    return { color: "#ef4444", symbol: "▼" };
  };

  return (
    <div className="p-8 bg-[#0a0d12] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">Tasks Overview</h1>

      <div className="grid grid-cols-3 gap-8">
        {/* LEFT SIDE — User Stats */}
        <div className="col-span-2 bg-[#12151b] rounded-2xl border border-gray-800 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Task Management</h2>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Search Name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#0f1117] border border-gray-700 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 ring-blue-500/40"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-gray-400 border-b border-gray-800">
                <tr>
                  <th className="text-left py-2 px-3 font-medium">Name</th>
                  <th className="text-left py-2 px-3 font-medium">Assigned</th>
                  <th className="text-left py-2 px-3 font-medium text-green-400">
                    Completed
                  </th>
                  <th className="text-left py-2 px-3 font-medium text-blue-400">
                    Ongoing
                  </th>
                  <th className="text-left py-2 px-3 font-medium text-gray-400">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody>
                {visible.map((u, i) => {
                  const t = getTrendStyle(u.trend);
                  return (
                    <tr
                      key={i}
                      className="border-b border-gray-900 hover:bg-[#141821] transition"
                    >
                      <td className="py-2 px-3 flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-full bg-green-700 flex items-center justify-center text-xs font-bold">
                          {u.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </div>
                        <span>{u.name}</span>
                      </td>
                      <td className="py-2 px-3 text-gray-300">{u.assigned}</td>
                      <td className="py-2 px-3 text-green-400">{u.completed}</td>
                      <td className="py-2 px-3 text-blue-400">{u.inProgress}</td>
                      <td
                        className="py-2 px-3 text-right"
                        style={{ color: t.color }}
                      >
                        {t.symbol} {u.trend}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6 text-gray-400 text-sm">
            <p>
              Showing {startIndex + 1}-
              {Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)} of{" "}
              {filtered.length}
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="bg-[#0f1117] border border-gray-700 rounded-lg px-3 py-1 disabled:opacity-40"
              >
                ‹ Prev
              </button>
              <button
                onClick={() =>
                  setPage((p) =>
                    startIndex + ITEMS_PER_PAGE >= filtered.length ? p : p + 1
                  )
                }
                disabled={startIndex + ITEMS_PER_PAGE >= filtered.length}
                className="bg-[#0f1117] border border-gray-700 rounded-lg px-3 py-1 disabled:opacity-40"
              >
                Next ›
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — Charts */}
        <div className="space-y-8">
          {/* Donut Chart for Tasks by Project */}
          <ChartCard
            title="Tasks by Project"
            data={projectStats}
            COLORS={COLORS}
          />

          {/* Horizontal Bar Chart for Open Issues */}
          <OpenIssuesBarChart
            title="Open Issues by Project"
            data={openIssues}
            COLORS={COLORS}
          />
        </div>
      </div>
    </div>
  );
}

// 🍩 Donut Chart
function ChartCard({ title, data, COLORS }) {
  return (
    <div className="bg-[#12151b] rounded-2xl border border-gray-800 p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="h-60">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// 📊 Horizontal Bar Chart for Open Issues
function OpenIssuesBarChart({ title, data, COLORS }) {
  return (
    <div className="bg-[#12151b] rounded-2xl border border-gray-800 p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis type="number" stroke="#9ca3af" />
            <YAxis
              dataKey="name"
              type="category"
              stroke="#9ca3af"
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f1117",
                border: "1px solid #333",
                color: "#fff",
              }}
            />
            <Bar dataKey="value" radius={[6, 6, 6, 6]}>
              <LabelList dataKey="value" position="right" fill="#fff" />
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
