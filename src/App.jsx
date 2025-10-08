import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [text, setText] = useState("");
  const [entries, setEntries] = useState([]);

  // Fetch entries on load
  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await axios.get(`${API_URL}/entries/`);
      setEntries(res.data);
    } catch (err) {
      console.error("Error fetching entries:", err);
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;
    try {
      await axios.post(`${API_URL}/entries/`, { content: text });
      setText("");
      fetchEntries(); // Refresh list
    } catch (err) {
      console.error("Error submitting entry:", err);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "600px", margin: "auto" }}>
      <h1>Text Submission App test run 2</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text..."
        style={{ padding: "0.5rem", width: "80%" }}
      />
      <button onClick={handleSubmit} style={{ padding: "0.5rem", marginLeft: "0.5rem" }}>
        Submit
      </button>

      <h2>Stored Entries</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>{entry.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
