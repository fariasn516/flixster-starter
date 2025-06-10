import { useState } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import SearchForm from './components/SearchForm';

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <div className="App">
      <header>
        <h1>Flixster Movie App</h1>
        <SearchForm
          onSearch={handleSearch}
          onClear={handleClear}
        />
      </header>
      <main>
        <MovieList searchQuery={searchQuery} />
      </main>
      <footer>© 2025 Flixster by Nancy F.</footer>
    </div>
  );
};

export default App;
