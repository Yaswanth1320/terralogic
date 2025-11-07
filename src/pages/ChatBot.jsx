import { useState } from "react";

const API_BASE = "http://localhost:8000/api/ai";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hey there 👋 How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();

      const botReply = {
        role: "assistant",
        content: data.reply || "⚠️ Sorry, I couldn’t generate a response.",
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] bg-[#0a0d12] text-white">
      <div className="border-b py-4 border-gray-800 text-xl font-bold">
        💬 AI ChatBot
      </div>

      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-[#1c1f26] text-gray-200 rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#1c1f26] px-4 py-2 rounded-2xl text-gray-400 italic">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form
        onSubmit={sendMessage}
        className="p-4 border-t border-gray-800 bg-[#12151b] flex items-center space-x-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-[#0f1117] border border-gray-700 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 ring-blue-500/40"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
