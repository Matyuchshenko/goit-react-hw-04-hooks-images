import { useState } from "react";
import "./SearchBar.css";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

export default function Searchbar({ onHandleSubmit }) {
  const [query, setQuery] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      return toast.info("Please enter a value for search images");
    }
    onHandleSubmit(query);
    setQuery("");
  };
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSubmit}>
        <button type="submit" className="SearchForm__button">
          <span className="SearchForm__button__label">Search</span>
        </button>

        <input
          className="SearchForm__input"
          type="text"
          value={query}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={({ target }) => setQuery(target.value)}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
};
