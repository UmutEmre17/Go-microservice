// Dashboard.tsx
import { useState } from "react";
import { Send, ListChecks } from "lucide-react";

import MessageSend from "./MessageSend";
import MessageHistory from "./MessageHistory";

export default function Dashboard() {
  const [tab, setTab] = useState<"send" | "history">("send");

  return (
    <div className="flex h-screen">
  
  {/* Sidebar */}
  <div className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col gap-4">
    <h2 className="text-2xl font-bold mb-3">SMS Panel</h2>

    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-left 
        ${tab === "send" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}
      onClick={() => setTab("send")}
    >
      <Send size={18} />
      Mesaj Gönder
    </button>

    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-left 
        ${tab === "history" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}
      onClick={() => setTab("history")}
    >
      <ListChecks size={18} />
      Gönderilen Mesajlar
    </button>
  </div>

  {/* Content */}
  <div className="flex-1 bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-10 overflow-y-auto">
    <div className="flex justify-center">
      {tab === "send" ? <MessageSend /> : <MessageHistory />}
    </div>
  </div>

</div>

  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#f6f7fb",
  },

  sidebar: {
    width: "220px",
    backgroundColor: "#fff",
    borderRight: "1px solid #e4e4e7",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  } as React.CSSProperties,
};
