import { useState } from "react";

interface GovGuideResponse {
  answer: string;
  sources: string[];
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<GovGuideResponse | null>(null);

  const handleAsk = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_GOVGUIDE_API_URL}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setResponse(data);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">GovGuide Demo</h1>
      <input
        type="text"
        className="border p-2 w-80 rounded"
        placeholder="Ask about UK government services..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={handleAsk}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Ask
      </button>

      {response && (
        <div className="mt-4 p-4 border rounded w-96">
          <p><strong>Answer:</strong> {response.answer}</p>
          <p className="mt-2"><strong>Sources:</strong></p>
          <ul>
            {response.sources.map((src, i) => (
              <li key={i}>
                <a href={src} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  {src}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
