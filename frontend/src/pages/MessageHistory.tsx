// MessageHistory.tsx
import { useEffect, useState } from "react";

export default function MessageHistory() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:8000/sms/logs", {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  
  if (data.error) {
    console.error("AUTH ERROR:", data.error);
    return;
  }
console.log("BACKEND RESPONSE:", data);
  setLogs(data);
};

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="w-[700px] mt-10 bg-white rounded-2xl shadow-xl p-8 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Gönderilen Mesajlar</h2>

        <table className="w-full border-separate border-spacing-y-3">
            <thead className="text-left text-gray-500">
            <tr>
                <th className="px-3">Telefon</th>
                <th className="px-3">Mesaj</th>
                <th className="px-3">Tarih</th>
            </tr>
            </thead>
            <tbody>
            {logs.map((x: any) => (
                <tr key={x.ID} className="bg-gray-50 rounded-xl">
                <td className="p-3">{x.Phone}</td>
                <td className="p-3">{x.Message}</td>
                <td className="p-3">{new Date(x.CreatedAt).toLocaleString()}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
    
  );
}

const styles = {
  card: {
    backgroundColor: "#fff",
    padding: "32px",
    borderRadius: "16px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
    width: "700px",
    marginTop: "30%",
    marginLeft: "70%"
  },
  title: {
    marginBottom: "20px",
    fontSize: "28px",
    fontWeight: 700,
    color: "#1e1e2f",
  },
  content: {
    flex: 1,
    padding: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    background: "linear-gradient(135deg, #eef2ff 0%, #f7f7ff 40%, #ffffff 100%)",
  },
  row: {
    background: "#fafafa",
    borderRadius: "8px",
  },

  cell: {
    padding: "12px 16px",
    background: "#fff",
    borderBottom: "1px solid #eee",
    fontSize: "14px",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 10px",
  } as React.CSSProperties,
};
