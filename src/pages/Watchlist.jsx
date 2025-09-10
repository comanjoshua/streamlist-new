import React from "react";
import { useWatchlist } from "../context/WatchlistContext";
import { img } from "../api/tmdb";
import { Link } from "react-router-dom";

function WatchlistPage() {
  const { list, remove, clear } = useWatchlist();

  return (
    <div className="container stack">
      <h1 style={{ fontWeight: 800 }}>Watchlist</h1>

      <div
        className="card"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <div>{list.length} saved</div>
        <button className="btn" onClick={clear} disabled={list.length === 0}>
          Clear all
        </button>
      </div>

      {list.length === 0 ? (
        <div className="card">
          No saved titles yet. Go to{" "}
          <Link to="/search" className="btn">Search</Link> and add some.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          }}
        >
          {list.map((m) => (
            <article key={m.id} className="card" style={{ display: "grid", gap: ".5rem" }}>
              <div
                style={{
                  aspectRatio: "2/3",
                  overflow: "hidden",
                  borderRadius: "12px",
                  border: "1px solid var(--border)",
                }}
              >
                <img
                  src={img(m.poster_path)}
                  alt={m.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <h3 style={{ margin: 0, fontWeight: 700 }}>{m.title}</h3>
                <div style={{ opacity: 0.8 }}>
                  {m.year ?? (m.release_date ? m.release_date.slice(0, 4) : "—")} • ⭐{" "}
                  {m.vote_average?.toFixed?.(1) ?? "—"}
                </div>
              </div>
              <div style={{ display: "flex", gap: ".5rem" }}>
                <Link
                  to={`/details/${m.id}`}
                  state={{ from: "watchlist" }}
                  className="btn"
                >
                  Details
                </Link>
                <button className="btn danger" onClick={() => remove(m.id)}>
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchlistPage;
