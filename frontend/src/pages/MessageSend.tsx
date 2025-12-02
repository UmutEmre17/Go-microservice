// MessageSend.tsx
import { useState } from "react";

export default function MessageSend() {
  const [Phone, setPhone] = useState("");
  const [Message, setText] = useState("");

  const token = localStorage.getItem("token");
  const sendMessage = async () => {
    const res = await fetch("http://localhost:8000/send-sms", {
      method: "POST",
      headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
      body: JSON.stringify({ Phone, Message }),
    });

    if (res.ok) alert("Mesaj gönderildi!");
    else alert("Hata oluştu!");
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-10 w-[650px]">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Mesaj Gönder
        </h2>

        <label className="block text-gray-700 font-medium mb-1">
            Telefon Numarası
        </label>
        <input
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring focus:ring-blue-200"
            placeholder="+90 5xx xxx xx xx"
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
        />

        <label className="block text-gray-700 font-medium mb-1">
            Mesaj
        </label>
        <textarea
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring focus:ring-blue-200"
            rows={5}
            value={Message}
            onChange={(e) => setText(e.target.value)}
        />

        <button
            onClick={sendMessage}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold p-3 rounded-lg mt-4"
        >
            Gönder
        </button>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    width: "500px",
    maxWidth: "100%",
  },
  title: {
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "600",
  },
  label: { marginTop: "12px", fontWeight: "500" },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #d4d4d8",
    marginTop: "6px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #d4d4d8",
    marginTop: "6px",
  },
  button: {
    marginTop: "20px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px",
    width: "100%",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
};
