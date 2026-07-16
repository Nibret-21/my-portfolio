import { useState } from "react";
import { api } from "../services/api";

export default function AIChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);
      setAnswer("");

      const response = await api.post("/ai/ask", {
        question,
      });

      setAnswer(response.data.answer);
    } catch (error) {
      console.error(error);

      setAnswer(
        error.response?.data?.error || "Failed to connect to AI assistant",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>AI Portfolio Assistant</h2>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask about my skills or projects..."
      />

      <button onClick={askAI}>{loading ? "Thinking..." : "Ask"}</button>

      {answer && (
        <div>
          <h3>Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
