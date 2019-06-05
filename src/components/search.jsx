import React from "react";

const Search = ({ value, onChange }) => {
  return (
    <div className="input-group">
      <input
        className="form-control"
        type="text"
        id="search"
        placeholder="Search..."
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
        autoComplete="off"
      />
    </div>
  );
};

export default Search;
