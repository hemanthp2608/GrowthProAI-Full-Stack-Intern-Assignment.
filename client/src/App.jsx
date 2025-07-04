import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBusinessData = async () => {
    setLoading(true);
    const res = await axios.post('http://localhost:5000/business-data', { name, location });
    setData(res.data);
    setLoading(false);
  };

  const regenerateHeadline = async () => {
    const res = await axios.get(`http://localhost:5000/regenerate-headline?name=${name}&location=${location}`);
    setData(prev => ({ ...prev, headline: res.data.headline }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Local Business Dashboard</h1>
        <input
          className="w-full p-2 mb-3 border rounded"
          placeholder="Business Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className="w-full p-2 mb-3 border rounded"
          placeholder="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={fetchBusinessData}
        >
          Submit
        </button>

        {loading && <p className="text-center mt-4">Loading...</p>}

        {data && (
          <div className="mt-6 border-t pt-4">
            <p><strong>Rating:</strong> {data.rating}★</p>
            <p><strong>Reviews:</strong> {data.reviews}</p>
            <p><strong>SEO Headline:</strong> {data.headline}</p>
            <button
              className="mt-2 bg-green-500 text-white p-2 rounded"
              onClick={regenerateHeadline}
            >
              Regenerate SEO Headline
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
