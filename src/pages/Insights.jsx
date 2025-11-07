// src/pages/Insights.jsx
import { useEffect, useState } from "react";

export default function Insights() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInsights() {
      try {
        const res = await fetch("http://localhost:8000/api/insights");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching AI insights:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchInsights();
  }, []);

  if (loading) return <div className="text-white p-8">Loading AI Insights...</div>;
  if (!data) return <div className="text-white p-8">No data available</div>;

  const { insights, teams } = data;

  return (
    <div className="p-8 text-white bg-[#0a0d12] min-h-screen">
      <h1 className="text-3xl font-bold mb-8">AI Insights</h1>

      {/* --- Team Benchmarking Section --- */}
      <section className="bg-[#12151b] p-6 rounded-2xl border border-gray-800 mb-8">
        <h2 className="text-green-400 font-semibold mb-2 flex items-center text-lg">
          🧠 Team Benchmarking
        </h2>
        <p className="text-gray-400 text-sm mb-6">AI-powered comparison across all teams</p>

        <div className="grid grid-cols-4 gap-4">
          {teams.map((team) => (
            <div
              key={team._id}
              className={`rounded-xl p-4 bg-[#0f1117] border ${
                team.rank === 1 ? "border-yellow-500" : "border-gray-700"
              }`}
            >
              <h3 className="text-md font-semibold">{team.name}</h3>
              <p className="text-gray-400 text-sm">Tasks: {team.tasksCompleted}</p>
              <p className="text-gray-400 text-sm">Velocity: {team.velocity}/wk</p>
              <p className="text-gray-400 text-sm">Efficiency: {team.efficiency}%</p>
              <p className="mt-2 text-blue-400 text-xs font-medium">Rank #{team.rank}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-[#0f1117] p-5 rounded-xl border border-gray-800">
          <h4 className="font-semibold text-green-400 mb-2">AI Summary</h4>
          <p className="text-gray-300 text-sm leading-relaxed">{insights?.benchmarking}</p>
        </div>
      </section>

      {/* --- Predictive Performance --- */}
      <section className="bg-[#12151b] p-6 rounded-2xl border border-gray-800">
        <h2 className="text-lg font-semibold mb-3 text-blue-400">Predictive Performance Analysis</h2>
        <p className="text-gray-300 text-sm mb-4">{insights?.summary}</p>

        <div className="grid grid-cols-3 gap-4 text-sm text-gray-300">
          <div className="bg-[#0f1117] p-4 rounded-xl border border-gray-800">
            <p className="font-semibold text-blue-400 mb-1">Sprint Completion</p>
            <p>{insights?.predictions || "No prediction available"}</p>
          </div>
          <div className="bg-[#0f1117] p-4 rounded-xl border border-gray-800">
            <p className="font-semibold text-green-400 mb-1">Risk Level</p>
            <p>{insights?.riskLevel || "Unknown"}</p>
          </div>
          <div className="bg-[#0f1117] p-4 rounded-xl border border-gray-800">
            <p className="font-semibold text-yellow-400 mb-1">Action Plan</p>
            <p>{insights?.recommendation || "No recommendation provided"}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
