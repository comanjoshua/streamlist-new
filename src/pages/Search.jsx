import React, { useState, useEffect } from "react";
import { tmdb, img } from "../api/tmdb";
import { Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [mode, setMode] = useState("trending"); // "trending" or "search"
  const { add } = useWatchlist();

  // On mount: restore last search or load trending
  useEffect(() => {
    const savedQuery = localStorage.getItem("lastQuery");
    const savedResults = localStorage.getItem("lastResults");

    if (savedResults) {
      setQuery(savedQuery || "");
      setResults(JSON.parse(savedResults));
      setMode("search");
    } else {
      tmdb.trending("day")
        .then((res) => setResults(res.results || []))
        .catch((err) => console.error("Trending load error:", err));
    }
  }, []);

  // Handle search
  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await tmdb.search(query);
      setResults(res.results || []);
      setMode("search");

      // Persist
      localStorage.setItem("lastQuery", query);
      localStorage.setItem("lastResults", JSON.stringify(res.results || []));
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    }
  }

  return (
    <div className="container stack">
      <h1 style={{ fontWeight: 800, marginBottom: "1rem" }}>Browse Movies</h1>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          style={{
            flex: "1",
            maxWidth: "500px",
            padding: "0.75rem 1rem",
            borderRadius: "9999px",
            border: "1px solid var(--border)",
            fontSize: "1rem",
            outline: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        />
        <button
          className="btn"
          style={{
            marginLeft: "0.5rem",
            borderRadius: "9999px",
            padding: "0.75rem 1.5rem",
            fontWeight: "600",
          }}
        >
          Search
        </button>
      </form>

      {/* Section Title */}
      <h2 style={{ marginBottom: "1rem" }}>
        {mode === "trending"
          ? "Trending Now"
          : `Search Results for “${query || localStorage.getItem("lastQuery") || ""}”`}
      </h2>

      {/* Movie Grid */}
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        }}
      >
        {results.map((m) => (
          <article
            key={m.id}
            className="card"
            style={{
              background: "#111",
              borderRadius: "12px",
              overflow: "hidden",
              color: "white",
              cursor: "pointer",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ aspectRatio: "2/3", overflow: "hidden" }}>
              <img
                src={img(m.poster_path, "w500")}
                alt={m.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
            <div style={{ padding: "0.5rem" }}>
              <h3 style={{ margin: "0 0 0.25rem 0", fontWeight: 700, fontSize: "1rem" }}>
                {m.title}
              </h3>
              <div style={{ opacity: 0.8, fontSize: "0.85rem" }}>
                {m.release_date ? m.release_date.slice(0, 4) : "—"} • ⭐{" "}
                {m.vote_average?.toFixed?.(1) ?? "—"}
              </div>
            </div>
            <div style={{ display: "flex", gap: ".5rem", padding: "0.5rem" }}>
              <Link
                to={`/details/${m.id}`}
                state={{ from: "search" }}
                className="btn"
              >
                Details
              </Link>
              <button className="btn" onClick={() => add(m)}>
                Add
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
