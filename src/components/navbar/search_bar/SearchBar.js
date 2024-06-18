import "./SearchBarStyle.css";
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  return (
    <div className="search-container">
      <form className="searchbar-form" action="/#">
        <input className="searchbar-input" type="search" placeholder="Search..."/>
        <button className="searchbar-button" type="submit"><SearchIcon className="search-icon"/></button>
      </form>
    </div>
  );
}

export default SearchBar;