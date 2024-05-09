import "./Header.css";
import { UseDataContext } from "../../context/Context";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const {
    data,
    setDisplayData,
    displayData,
    fetchData,
    setLoading,
    favorites,
    SetNewTypeData,
  } = UseDataContext();
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchQuery}`
      );

      const pokemonData = await response.json();
      setDisplayData([pokemonData]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTypeChange = async (e) => {
    setLoading(true);
    const selectedType = e.target.value;
    setDisplayData([]);
    try {
      if (selectedType !== "All") {
        const typeIndex = data.findIndex((elem) => elem.name === selectedType);
        if (typeIndex === -1) {
          throw new Error("Type not found in data");
        }
        const response = await fetch(data[typeIndex].url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const parsedResponse = await response.json();
        const pokemonUrls = parsedResponse.pokemon.map(
          (pokemon) => pokemon.pokemon.url
        );
        const pokemonDataPromises = pokemonUrls.map(async (url) => {
          const pokemonResponse = await fetch(url);
          return pokemonResponse.json();
        });
        const pokemonData = await Promise.all(pokemonDataPromises);
        setDisplayData(pokemonData);
      } else {
        fetchData(1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false);
  };

  const handleFilterChange = async (e) => {};

  console.log(displayData);
  return (
    <header>
      <div className="logo">
        <h1>
          Pok<span style={{ color: "rgb(239 59 77)" }}>é</span>dex
        </h1>
        <NavLink to="/wishlist" className="favorite-head-anchor">
          <span
            className="material-symbols-outlined favorite-head"
            style={{
              color: favorites.length > 0 ? "rgb(239 59 77) " : "#383636",
            }}
          >
            favorite
          </span>
        </NavLink>
      </div>
      <div className="header-types">
        <div className="header-types-box1">
          <div>
            <p>Search by Type:</p>
            <select onChange={handleTypeChange}>
              <option value="All">All</option>
              {data &&
                data.map((elem, key) =>
                  key < 18 ? (
                    <option key={key} value={elem.name}>
                      {elem.name}
                    </option>
                  ) : (
                    ""
                  )
                )}
            </select>
          </div>
          <div>
            <p>Filter by:</p>
            <select onChange={handleFilterChange}>
              <option value="pokemon">All</option>
              <option value="ability">Abilities</option>
              <option value="characteristic">Characteristics</option>
              <option value="Group">egg-group</option>
              <option value="Habitat">pokemon-habitat</option>
              <option value="Location">Location</option>
              <option value="Species">pokemon-species</option>
            </select>
          </div>
        </div>
        <div>
          <p>Search by Type:</p>
          <input
            type="text"
            value={searchQuery}
            placeholder="Search by name."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearchChange}>click</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
