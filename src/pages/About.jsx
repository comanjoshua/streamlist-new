import React from "react";

export default function About() {
  return (
    <div className="container stack">
      <h1 className="text-xl" style={{ fontWeight: 800 }}>About EZ Tech</h1>

      <div className="card stack">
        <p>
          EZ Tech helps you browse movies, track a watchlist, and manage a cart for gear and plans.
          The app uses React Router, a global theme with CSS tokens, and a clean pill nav.
        </p>

        <div className="stack">
          <h2 className="text-lg" style={{ fontWeight: 700 }}>What’s inside</h2>
          <ul className="stack" style={{ listStyle: "disc", paddingLeft: "1.25rem" }}>
            <li>Icon nav with a theme toggle</li>
            <li>Movies, details, watchlist, cart, subscriptions</li>
            <li>Light and dark tokens for fast theming</li>
          </ul>
        </div>

        <div className="stack">
          <h2 className="text-lg" style={{ fontWeight: 700 }}>Credits</h2>
          <p>Built with React 18 and your design tokens. Icons come from react-icons.</p>
        </div>
      </div>
    </div>
  );
}
