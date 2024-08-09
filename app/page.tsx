"use client";
import { useStore } from "@/store/store";
import { useEffect, useState } from "react";

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [responseData, setResponseData] = useState<{
    email: string;
    id: string;
  } | null>(null);
  const { user, setUser, messages, addmessage } = useStore();

  useEffect(() => {
    setResponseData(user);
  }, [user]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/account/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const res = await response.json();
      const data = res.data;
      setUser(data);
      setResponseData(data);
      setUsername("");
      setPassword("");
    } else {
    }
  };

  const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const from = responseData?.email;
    const to = email;
    const subject = "Demo Email Inbox Integration";
    const text = message;
    const msgdata ={ from, to, subject, text };
    const response = await fetch("/api/emails/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(msgdata),
    });

    if (response.ok) {
      const res = await response.json();
      const data = res.data;
      addmessage(msgdata);
      // setUser(data);
      // setResponseData(data);
      setEmail("");
      setMessage("");
      alert("Message sent");
    } else {
    }
  };

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      className="flex flex-col"
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "300px" }}
      >
        <h1>Register</h1>
        <input
          type="text"
          className="rounded-lg text-gray-500"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: "10px", padding: "8px", fontSize: "16px" }}
          required
        />
        <input
          className="rounded-lg text-gray-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: "10px", padding: "8px", fontSize: "16px" }}
          required
        />
        <button
          className="border-2 border-white rounded-lg text-white"
          type="submit"
          style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}
        >
          Save
        </button>
      </form>
      {responseData && (
        <div className="flex flex-col">
          <div
            className="text-whide mt-4"
            style={{ padding: "10px", width: "300px" }}
          >
            <h2>Response Data</h2>
            <p>
              <strong>Email:</strong> {responseData.email}
            </p>
            <p>
              <strong>ID:</strong> {responseData.id}
            </p>
          </div>
          <div>
            <form
              onSubmit={handleSendEmail}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "300px",
              }}
            >
              <h1>Send mail</h1>
              <input
                type="text"
                className="rounded-lg text-gray-500"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  marginBottom: "10px",
                  padding: "8px",
                  fontSize: "16px",
                }}
                required
              />
              <input
                className="rounded-lg text-gray-500"
                placeholder="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  marginBottom: "10px",
                  padding: "8px",
                  fontSize: "16px",
                }}
                required
              />
              <button
                className="border-2 border-white rounded-lg text-white"
                type="submit"
                style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}
              >
                Send
              </button>
            </form>
          </div>
          {messages.length > 0 && (
            <div className="flex flex-col mt-4">
              <h2>Messages</h2>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    padding: "10px",
                    width: "300px",
                    border: "1px solid #ccc",
                    marginBottom: "10px",
                  }}
                >
                  <p>
                    <strong>From:</strong> {msg.from}
                  </p>
                  <p>
                    <strong>To:</strong> {msg.to}
                  </p>
                  <p>
                    <strong>Subject:</strong> {msg.subject}
                  </p>
                  <p>
                    <strong>Message:</strong> {msg.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
