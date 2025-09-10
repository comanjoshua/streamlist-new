import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { tmdb, img } from "../api/tmdb";

export default function MovieSearchDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let on = true;
    setLoading(true);
    tmdb.details(id)
      .then(d => { if (on) setData(d); })
      .catch(e => { if (on) setErr(e.message); })
      .finally(() => on && setLoading(false));
    return () => { on = false; };
  }, [id]);

  if (loading) return <div className="container"><div className="card">Loading…</div></div>;
  if (err) return <div className="container"><div className="card">Error: {err}</div></div>;
  if (!data) return null;

  return (
    <div className="container stack">
      <Link to="/moviesearch" className="btn" style={{ width: "fit-content" }}>← Back</Link>

      <div className="card" style={{ display: "grid", gap: "1rem", gridTemplateColumns: "220px 1fr" }}>
        <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
          <img src={img(data.poster_path, "w342")} alt={data.title} style={{ width: "100%", display: "block" }} />
        </div>
        <div className="stack">
          <h1 className="text-xl" style={{ fontWeight: 800 }}>{data.title}</h1>
          <div>{data.release_date?.slice(0, 4)} • ⭐ {data.vote_average?.toFixed(1)}</div>
          <p>{data.overview || "No overview"}</p>
          <div>Runtime: {data.runtime ? `${data.runtime} min` : "—"}</div>
          <div>Genres: {data.genres?.map(g => g.name).join(", ") || "—"}</div>
        </div>
      </div>
    </div>
  );
}
