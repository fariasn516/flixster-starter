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
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="App">
      {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
      <header className="App-header">
        <div className='header-and-menu'>
          <button onClick={openSidebar} className='hamburger-button'>☰</button>
          <Sidebar isOpen={isSidebarOpen} />
          <h1 className='app-title'> ✧ Flixster ✧  </h1>
        </div>
        <div className='search-and-sort'>
        <SearchForm
          onSearch={handleSearch}
          onClear={handleClear}
        />
        <SortDropdown
          onSortInput={handleSortInput}
          sortValue={sortInput}
        />
        </div>
      </header >
      <main>
        <MovieList
          searchQuery={searchQuery}
          sortInput={sortInput}
        />
      </main>
      <footer>© 2025 Flixster by Nancy F.</footer>
    </div >
  );
};

export default App;
