import "./Header.css";
import { UseDataContext } from "../../context/Context";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const {
    data,
    setDisplayData,
    displayData,
    fetchData,
    setLoading,
    favorites,
    globalData,
  } = UseDataContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [abilityList, setAbilityList] = useState([]);
  const [abilityValue, setAbilityValue] = useState(null);
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
  // const filtereData = () => {
  //   if (!abilityValue || abilityValue === "") {
  //     // If abilityValue is not set or empty, display all data
  //     setDisplayData([...globalData]);
  //   } else {
  //     // Filter data based on abilityValue
  //     console.log(abilityValue);
  //     let filtered = globalData.filter(
  //       (element) =>
  //         Array.isArray(element.abilities) && // Check if abilities is an array
  //         element.abilities.some((ability) => ability.name === abilityValue)
  //     );
  //     // Update displayData state with filtered results
  //     console.log(filtered);
  //     // setDisplayData(filtered);
  //   }
  // };

  // const Abilities = async () => {
  //   let data = await fetch("https://pokeapi.co/api/v2/ability?limit=100");
  //   let convertedData = await data.json();
  //   setAbilityList([...convertedData.results]);
  // };

  // useEffect(() => {
  //   Abilities();
  // }, []);
  // useEffect(() => {
  //   filtereData();
  //   // console.log(globalData);
  // }, [abilityValue]);

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
          {/* <div>
            <p>Filter by Abilities:</p>

            <select onChange={(e) => setAbilityValue(e.target.value)}>
              {abilityList?.map((element, index) => (
                <option key={index} value={element.name}>
                  {element.name}
                </option>
              ))}
            </select>
          </div> */}
        </div>
        <div>
          <p>Search by Name:</p>
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
