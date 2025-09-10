import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { tmdb, img } from "../api/tmdb";

export default function Details() {
  const { id } = useParams();
  const location = useLocation();
  const from = location.state?.from || "search"; // read state, fallback to search

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    tmdb.details(id)
      .then(setMovie)
      .catch((err) => {
        console.error("TMDB fetch failed:", err);
        setError("Could not load details.");
      });
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!movie) return <p>Loading…</p>;

  return (
    <section className="stack container page--box">
      {from === "search" ? (
        <Link to="/search" className="btn">⬅ Back to Search</Link>
      ) : (
        <Link to="/watchlist" className="btn">⬅ Back to Watchlist</Link>
      )}

      <h1>{movie.title}</h1>

      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        {movie.poster_path && (
          <img
            src={img(movie.poster_path, "w300")}
            alt={movie.title}
            style={{ borderRadius: "0.5rem", maxHeight: "450px" }}
          />
        )}

        <div>
          <p><strong>Release:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
          <p><strong>Overview:</strong> {movie.overview}</p>
          {movie.genres?.length > 0 && (
            <p><strong>Genres:</strong> {movie.genres.map((g) => g.name).join(", ")}</p>
          )}
        </div>
      </div>
    </section>
  );
}
