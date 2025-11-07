// src/pages/Query.jsx
import { useEffect, useMemo, useState } from "react";

const API_BASE = "http://localhost:8000/api";

export default function Query() {
  const [q, setQ] = useState("");
  const [statuses, setStatuses] = useState(["open", "in_progress", "completed", "blocked"]);
  const [project, setProject] = useState("");
  const [assignee, setAssignee] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sort, setSort] = useState("-updatedAt");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // Fetch lookups (projects, users)
  useEffect(() => {
    const load = async () => {
      try {
        const [pRes, uRes] = await Promise.all([
          fetch(`${API_BASE}/projects`),
          fetch(`${API_BASE}/users`),
        ]);
        const pData = await pRes.json();
        const uData = await uRes.json();
        setProjects(pData.projects || []);
        setUsers(uData || []);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  // Build query string
  const qs = useMemo(() => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (statuses.length && statuses.length < 4) params.set("status", statuses.join(","));
    if (project) params.set("project", project);
    if (assignee) params.set("assignee", assignee);
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (sort) params.set("sort", sort);
    params.set("page", page.toString());
    params.set("limit", limit.toString());
    return params.toString();
  }, [q, statuses, project, assignee, from, to, sort, page, limit]);

  // Fetch tasks
  const runQuery = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/tasks?${qs}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setTasks(data);
        setTotal(data.length);
      } else {
        setTasks(data.items || []);
        setTotal(data.total || 0);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Run query whenever filters, page, or limit change (debounced)
  useEffect(() => {
    const t = setTimeout(runQuery, 350);
    return () => clearTimeout(t);
  }, [qs]);

  const reset = () => {
    setQ("");
    setStatuses(["open", "in_progress", "completed", "blocked"]);
    setProject("");
    setAssignee("");
    setFrom("");
    setTo("");
    setSort("-updatedAt");
    setPage(1);
    setLimit(10);
  };

  const statusColors = {
    open: "bg-purple-600/20 text-purple-300 border border-purple-600/30",
    in_progress: "bg-blue-600/20 text-blue-300 border border-blue-600/30",
    completed: "bg-green-600/20 text-green-300 border border-green-600/30",
    blocked: "bg-rose-600/20 text-rose-300 border border-rose-600/30",
  };

  const distribution = useMemo(() => {
    return tasks.reduce(
      (acc, t) => {
        acc[t.status] = (acc[t.status] || 0) + 1;
        return acc;
      },
      { open: 0, in_progress: 0, completed: 0, blocked: 0 }
    );
  }, [tasks]);

  return (
    <div className="p-8 bg-[#0a0d12] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Task Status</h1>

      {/* Status pills and pagination controls */}
      <div className="bg-[#12151b] rounded-2xl p-6 border border-gray-800">
        <div className="mt-4  gap-2">
        <h1 className="text-3xl font-bold mb-6">Filter</h1>
          {["open", "in_progress", "completed", "blocked"].map((s) => {
            const active = statuses.includes(s);
            return (
              <button
                key={s}
                onClick={() => {
                  setStatuses((prev) =>
                    active ? prev.filter((x) => x !== s) : [...prev, s]
                  );
                  setPage(1);
                }}
                className={`px-3 py-1 mr-2 rounded-full text-xs border transition ${
                  active
                    ? statusColors[s]
                    : "bg-transparent border-gray-700 text-gray-400 hover:border-gray-500"
                }`}
              >
                {labelize(s)}
              </button>
            );
          })}

          {/* <div className="ml-auto flex items-center gap-2 text-sm">
            <span className="text-gray-400">Rows per page:</span>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
              className="bg-[#0f1117] border border-gray-800 rounded-lg px-2 py-1"
            >
              {[5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div> */}
        </div>
      </div>

      {/* Quick distribution */}
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4 my-6">
        {Object.entries(distribution).map(([k, v]) => (
          <div key={k} className="bg-[#12151b] rounded-2xl p-4 border border-gray-800">
            <p className="text-xs text-gray-400 mb-1">{labelize(k)}</p>
            <p className="text-2xl font-semibold">{v}</p>
          </div>
        ))}
      </div>

      {/* Results table */}
      <div className="bg-[#12151b] rounded-2xl border border-gray-800 overflow-hidden">
        <div className="px-6 py-4 flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Showing{" "}
            <span className="text-white">{tasks.length}</span> of{" "}
            <span className="text-white">{total}</span> tasks
          </p>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 rounded-lg bg-[#0f1117] border border-gray-700 disabled:opacity-40"
            >
              ‹ Prev
            </button>
            <button
              disabled={page * limit >= total}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 rounded-lg bg-[#0f1117] border border-gray-700 disabled:opacity-40"
            >
              Next ›
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-[#0f1117] text-gray-400">
              <tr>
                <Th>Title</Th>
                <Th>Project</Th>
                <Th>Assignee</Th>
                <Th>Status</Th>
                <Th>Created</Th>
                <Th>Updated</Th>
                <Th>Closed</Th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-gray-400">
                    Loading…
                  </td>
                </tr>
              ) : tasks.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-gray-400">
                    No tasks match your query.
                  </td>
                </tr>
              ) : (
                tasks.map((t) => (
                  <tr key={t._id} className="border-t border-gray-800 hover:bg-[#141821]">
                    <Td>{t.title}</Td>
                    <Td>{t.project?.name || "—"}</Td>
                    <Td>{t.assignedTo?.name || "Unassigned"}</Td>
                    <Td>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${statusColors[t.status]}`}>
                        {labelize(t.status)}
                      </span>
                    </Td>
                    <Td>{fmtDate(t.createdAt)}</Td>
                    <Td>{fmtDate(t.updatedAt)}</Td>
                    <Td>{t.closedAt ? fmtDate(t.closedAt) : "—"}</Td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Utility components and helpers
function Th({ children }) {
  return <th className="text-left px-6 py-3 font-medium">{children}</th>;
}
function Td({ children }) {
  return <td className="px-6 py-3">{children}</td>;
}
function labelize(s) {
  return s.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
function fmtDate(d) {
  if (!d) return "—";
  const date = new Date(d);
  return date.toLocaleString();
}
