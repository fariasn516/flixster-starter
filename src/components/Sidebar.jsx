import React from "react";

function Sidebar({
  isOpen,
  onFavoritesClick,
  showFavorites,
  onWatchedClick,
  showWatched,
}) {
  return (
    <section className={isOpen ? "sidebar-open" : "sidebar"}>
      <div className="sidebar-content">
        <div className="sidebar-header">
          <h2> Menu</h2>
        </div>
        <nav className="navigation-bar">
          <ul className="navigation-bar-list">
            <li>
              <a href="/" className="home-navigation">
                Home
              </a>
            </li>
            <li>
              <a
                className={`favorites-navigation ${
                  showFavorites ? "active" : ""
                }`}
                onClick={onFavoritesClick}
              >
                Favorites
              </a>
            </li>
            <li>
              <a
                className={`watched-navigation ${showWatched ? "active" : ""}`}
                onClick={onWatchedClick}
              >
                Watched
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default Sidebar;
