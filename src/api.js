const API_BASE = "http://localhost:8000/api"; // your backend URL

export const fetchOverview = async () => {
  const res = await fetch(`${API_BASE}/overview`);
  if (!res.ok) throw new Error("Failed to fetch overview data");
  return res.json();
};
