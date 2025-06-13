import { useState, useEffect } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import SearchForm from "./components/SearchForm";
import SortDropdown from "./components/SortDropdown";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortInput, setSortInput] = useState("default");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("flixster-favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    localStorage.setItem("flixster-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const [watched, setWatched] = useState(() => {
    const savedWatched = localStorage.getItem("flixster-watched");
    return savedWatched ? JSON.parse(savedWatched) : [];
  });
  const [showWatched, setShowWatched] = useState(false);

  useEffect(() => {
    localStorage.setItem("flixster-watched", JSON.stringify(watched));
  }, [watched]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  const handleSortInput = (sortOption) => {
    setSortInput(sortOption);
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleFavorite = (movieId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(movieId)) {
        return prevFavorites.filter((id) => id !== movieId);
      } else {
        return [...prevFavorites, movieId];
      }
    });
  };

  const toggleShowFavorites = () => {
    setShowFavorites((prev) => !prev);
    closeSidebar();
  };

  const toggleWatched = (movieId) => {
    setWatched((prevWatched) => {
      if (prevWatched.includes(movieId)) {
        return prevWatched.filter((id) => id !== movieId);
      } else {
        return [...prevWatched, movieId];
      }
    });
  };

  const toggleShowWatched = () => {
    setShowWatched((prev) => !prev);
    closeSidebar();
  };

  return (
    <div className="App">
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}
      <header className="App-header">
        <div className="header-and-menu">
          <button onClick={openSidebar} className="hamburger-button">
            ☰
          </button>
          <Sidebar
            isOpen={isSidebarOpen}
            onFavoritesClick={toggleShowFavorites}
            showFavorites={showFavorites}
            onWatchedClick={toggleShowWatched}
            showWatched={showWatched}
          />
          <h1 className="app-title"> ✧ Flixster ✧ </h1>
        </div>
        <div className="search-and-sort">
          <SearchForm onSearch={handleSearch} onClear={handleClear} />
          <SortDropdown onSortInput={handleSortInput} sortValue={sortInput} />
        </div>
      </header>
      <main>
        <MovieList
          searchQuery={searchQuery}
          sortInput={sortInput}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          showFavorites={showFavorites}
          watched={watched}
          toggleWatched={toggleWatched}
          showWatched={showWatched}
        />
      </main>
      <footer>© 2025 Flixster by Nancy F.</footer>
    </div>
  );
};

export default App;
