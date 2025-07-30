import { useState } from "react";
import search_icon from "../assets/search_icon.svg"

function Search(){
    const [query, setQuery] = useState("");
    const handleSearch = (e) => {
    e.preventDefault();
   
  };

     return (
        <div className="">

    <form onSubmit={handleSearch} className="search">
      <button type="submit" className="search_button"><img src={search_icon} alt="" className="search_img" /></button>
      <input 
        type="text"
        placeholder="Начните вводить в поиск"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="main_search"
      />
    </form>
        </div>
  );
} 

export default Search;