// src/api/tmdb.js

const API = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p";

// CRA: REACT_APP_TMDB_KEY
// Vite: import.meta.env.VITE_TMDB_KEY
const KEY = process.env.REACT_APP_TMDB_KEY;

export const img = (path, size = "w300") =>
  path ? `${IMG}/${size}${path}` : "";

// Generic fetch wrapper
async function req(path, params = {}) {
  const url = new URL(`${API}${path}`);
  url.searchParams.set("api_key", KEY);
  url.searchParams.set("language", "en-US");
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  console.log("Fetching:", url.toString()); // for debugging

  const res = await fetch(url);
  if (!res.ok) {
    console.error("TMDB error:", res.status, res.statusText);
    return { results: [] }; // safe fallback
  }
  return res.json();
}

// Export grouped TMDB methods
export const tmdb = {
  trending: (window = "day") => req(`/trending/movie/${window}`),
  search: (q, page = 1) =>
    req("/search/movie", {
      query: q,
      page: String(page),
      include_adult: "false",
    }),
  details: (id) => req(`/movie/${id}`),
  credits: (id) => req(`/movie/${id}/credits`),
};
