export default function OverviewCard({ title, value, change, color }) {
    return (
      <div className={`p-4 rounded-xl shadow ${color} text-white`}>
        <p className="text-sm opacity-75">{title}</p>
        <h3 className="text-2xl font-semibold mt-2">{value}</h3>
        <p className="text-xs mt-1 opacity-70">{change}</p>
      </div>
    );
  }
  