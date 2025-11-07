import { useEffect, useState } from "react";
import { fetchOverview } from "../api";
import OverviewCard from "../components/OverviewCard";
import DonutChart from "../components/DonutChart";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";

export default function Overview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchOverview();
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="text-white p-8">Loading dashboard...</div>;

  const { overview, taskStats } = data;

  return (
    <div className="p-8 bg-[#0a0d12] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">Overview Dashboard</h1>

      {/* Overview cards */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        <OverviewCard title="Open Tasks" value={overview.openTasks} change="-5% vs last week" color="bg-blue-700" />
        <OverviewCard title="In Progress" value={overview.inProgress} change="+7% vs last week" color="bg-green-700" />
        <OverviewCard title="Closed Today" value={overview.closedToday} change="+12% vs last week" color="bg-purple-700" />
        <OverviewCard title="Closed This Hour" value={overview.closedThisHour} change="+3% vs last week" color="bg-teal-700" />
        <OverviewCard title="Completion Rate" value={`${overview.completionRate}%`} change="+3% vs last week" color="bg-orange-700" />
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#12151b] p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">Task Distribution</h2>
          <DonutChart data={taskStats} />
        </div>

        <div className="bg-[#12151b] p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">7-Day Trend Analysis</h2>
          <LineChart trendData={overview.trendData} />
        </div>
      </div>

      {/* Team Performance */}
      <div className="bg-[#12151b] mt-8 p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">Team Performance</h2>
        <BarChart />
      </div>
    </div>
  );
}
