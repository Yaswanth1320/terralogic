// src/pages/Insights.jsx
import { useEffect, useState } from "react";

export default function Insights() {
  const [teams, setTeams] = useState([]);
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch team benchmarking data
        const teamRes = await fetch("http://localhost:5000/api/teams");
        const sentimentRes = await fetch("http://localhost:5000/api/sentiment/your-team-id"); // Replace with your team ID
        const teamsData = await teamRes.json();
        const sentimentData = await sentimentRes.json();
        setTeams(teamsData);
        setSentiment(sentimentData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="text-white p-8">Loading AI Insights...</div>;

  return (
    <div className="p-8 text-white bg-[#0a0d12] min-h-screen">
      <h1 className="text-3xl font-bold mb-8">AI Insights</h1>

      {/* --- Team Benchmarking Section --- */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {teams.map((team) => (
          <div
            key={team._id}
            className={`rounded-2xl p-6 bg-[#12151b] border ${
              team.rank === 1 ? "border-yellow-500" : "border-gray-700"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">{team.name}</h2>
              {team.rank === 1 && <span className="text-yellow-400 text-sm">🏆</span>}
            </div>
            <p className="text-gray-400">Total Tasks: {team.totalTasks}</p>
            <p className="text-gray-400">Velocity: {team.velocity}/wk</p>
            <p className="text-gray-400">Efficiency: {team.efficiency}%</p>
            <p className="mt-2 text-sm text-blue-400">Rank #{team.rank}</p>
          </div>
        ))}
      </div>

      {/* --- Benchmarking Insights Text --- */}
      <div className="bg-[#12151b] p-6 rounded-2xl border border-gray-800 mb-8">
        <h3 className="text-green-400 font-semibold mb-2 flex items-center">
          <span className="text-2xl mr-2">💡</span> Benchmarking Insights
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          Your team ranks <span className="font-semibold text-white">#2</span> with 8 tasks behind Alpha Team.
          Velocity increased <span className="text-green-400 font-semibold">22%</span> over 4 weeks,
          outpacing Beta (+16%) and Gamma (+29%). Focus on efficiency improvements to reach the #1 position.
        </p>
      </div>

      {/* --- Team Communication Sentiment --- */}
      <div className="bg-[#12151b] p-6 rounded-2xl border border-gray-800">
        <h3 className="text-lg font-semibold mb-4">Team Communication Sentiment</h3>
        <p className="text-gray-400 text-sm mb-6">
          Analyzed from commit messages, comments, and communication patterns.
        </p>

        <div className="space-y-4">
          <SentimentBar label="Positive" value={sentiment?.positive || 0} color="bg-green-500" />
          <SentimentBar label="Neutral" value={sentiment?.neutral || 0} color="bg-gray-400" />
          <SentimentBar label="Negative" value={sentiment?.negative || 0} color="bg-red-500" />
        </div>

        <div className="mt-6 bg-[#0f1117] p-4 rounded-xl text-gray-300">
          <span className="font-semibold text-green-400">Insight:</span>{" "}
          {sentiment?.insight ||
            "Team morale appears positive. Keep up the good work and maintain open communication."}
        </div>
      </div>
    </div>
  );
}

// Helper component
function SentimentBar({ label, value, color }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full bg-[#1e2530] h-3 rounded-full overflow-hidden">
        <div className={`${color} h-3 rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}
