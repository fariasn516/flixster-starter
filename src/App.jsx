import { useState } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import SearchForm from './components/SearchForm';
import SortDropdown from './components/SortDropdown';
import Sidebar from './components/Sidebar';

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortInput, setSortInput] = useState("default");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      <header>
        <div className="menu-button" onClick={openSidebar}>
          <button>open sidebar</button>
        </div>
        <h1>Flixster Movie App</h1>
        <Sidebar isOpen={isSidebarOpen} />
        <SearchForm
          onSearch={handleSearch}
          onClear={handleClear}
        />
        <SortDropdown
          onSortInput={handleSortInput}
          sortValue={sortInput}
        />
      </header>
      <main>
        <MovieList
          searchQuery={searchQuery}
          sortInput={sortInput}
        />
      </main>
      <footer>© 2025 Flixster by Nancy F.</footer>
    </div>
  );
};

export default App;
