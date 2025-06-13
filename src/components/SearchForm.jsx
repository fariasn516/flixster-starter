import React, { useState } from "react";
import '../App.css';

function SearchForm({ onSearch, onClear }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery("");
    onClear();
  };

  return (
    <section className="search-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search movies..."
        />
        <button type="submit" className="search-button">Search</button>
        <button onClick={handleClear} className="clear-button">Clear</button>
      </form>
    </section>
  );
}

export default SearchForm;
