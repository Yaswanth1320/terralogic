// src/pages/Settings.jsx
import { useState } from "react";

export default function Settings() {
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState(true);
  const [apiKey, setApiKey] = useState("sk-************abcd");
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("✅ Settings saved!");
    }, 800);
  };

  return (
    <div className="p-10 bg-[#0a0d12] min-h-screen text-white">
      <h1 className="text-3xl text-center font-bold mb-10 tracking-tight">Settings</h1>

      <div className="space-y-10 max-w-2xl mx-auto">
        {/* General Settings */}
        <section className="bg-[#12151b] p-6 rounded-2xl border border-gray-800 shadow-md transition hover:border-blue-700/40">
          <h2 className="text-xl font-semibold mb-5 text-gray-100">General</h2>
          <div className="space-y-6">
            {/* Theme */}
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Theme</span>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-[#0f1117] border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-300 focus:ring-2 focus:ring-blue-500/40 outline-none"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="system">System Default</option>
              </select>
            </div>

            {/* Notifications */}
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                <div className="absolute left-[2px] top-[2px] w-5 h-5 bg-white rounded-full peer-checked:translate-x-full transition-transform duration-200"></div>
              </label>
            </div>
          </div>
        </section>

        {/* API Settings */}
        <section className="bg-[#12151b] p-6 rounded-2xl border border-gray-800 shadow-md transition hover:border-blue-700/40">
          <h2 className="text-xl font-semibold mb-5 text-gray-100">
            API Configuration
          </h2>
          <div>
            <label className="block text-sm text-gray-400 mb-2">API Key</label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-[#0f1117] border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-300 focus:ring-2 focus:ring-blue-500/40 outline-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              Keep your API key private. It’s used for external integrations.
            </p>
          </div>
        </section>

        {/* Account Info */}
        <section className="bg-[#12151b] p-6 rounded-2xl border border-gray-800 shadow-md transition hover:border-blue-700/40">
          <h2 className="text-xl font-semibold mb-5 text-gray-100">Account</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">User</span>
              <span className="font-medium text-gray-100">
                yaswanth@pulsevo.com
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Role</span>
              <span className="font-medium text-gray-100">Admin</span>
            </div>
          </div>

          <button className="mt-6 w-full bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg text-sm font-medium transition">
            Logout
          </button>
        </section>

        {/* Save Changes Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              saving
                ? "bg-blue-500/60 text-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 text-white"
            }`}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
