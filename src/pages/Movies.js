import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const SAMPLE = [
  { id: "tt0111161", title: "The Shawshank Redemption", year: 1994, rating: 9.3 },
  { id: "tt0068646", title: "The Godfather",             year: 1972, rating: 9.2 },
  { id: "tt0468569", title: "The Dark Knight",           year: 2008, rating: 9.0 }
];

export default function Movies() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return !t ? SAMPLE : SAMPLE.filter(m =>
      m.title.toLowerCase().includes(t) || String(m.year).includes(t)
    );
  }, [q]);

  return (
    <div className="container stack">
      <h1 style={{ fontWeight: 800 }}>Movies</h1>

      <div className="card" style={{ display: "grid", gap: ".75rem" }}>
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search by title or year"
          className="btn"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        />
      </div>

      <div style={{ display: "grid", gap: "1rem" }}>
        {list.map(m => (
          <div key={m.id} className="card" style={{ display: "flex", justifyContent: "space-between" }}>
            <div><strong>{m.title}</strong> — {m.year}</div>
            <div style={{ opacity: .8 }}>⭐ {m.rating}</div>
          </div>
        ))}
      </div>

      <div className="card">
        Want live data? Try <Link to="/moviesearch" className="btn">MovieSearch</Link>
      </div>
    </div>
  );
}
