import React from "react";
import '../App.css';

function SortDropdown({ onSortInput, sortValue }) {
  const handleSortInput = (e) => {
    onSortInput(e.target.value);
  };

  return (
    <section className="sort-dropdown">
      <label className="sort-by-label">Sort by: </label>
      <select
        value={sortValue}
        onChange={handleSortInput}
      >
        <option value="default">Default</option>
        <option value="sort-title">Title (A-Z)</option>
        <option value="sort-release-date">Release Date (Newest-Oldest)</option>
        <option value="sort-vote-average">Rating (Highest-Lowest)</option>
      </select>
    </section>
  );
}

export default SortDropdown;
