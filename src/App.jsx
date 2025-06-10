import { useState } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import SearchForm from './components/SearchForm';
import SortDropdown from './components/SortDropdown';

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortInput, setSortInput] = useState("default");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  const handleSortInput = (sortOption) => {
    setSortInput(sortOption);
  };

  return (
    <div className="App">
      <header>
        <h1>Flixster Movie App</h1>
        <div className="controls-container">
          <SearchForm
            onSearch={handleSearch}
            onClear={handleClear}
          />
          <SortDropdown
            onSortInput={handleSortInput}
            sortValue={sortInput}
          />
        </div>
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
