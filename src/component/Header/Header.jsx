import "./Header.css";
import pokeDexImg from "../../assets/pokedex.2800773d.png";
import { UseDataContext } from "../../context/Context";
import { useState } from "react";

function Header() {
  const {
    data,
    setTypeData,
    typeData,
    isLoading,
    displayData,
    setDisplayData,
    fetchData,
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
    const selectedType = e.target.value;
    setDisplayData([]);
    setTypeData(async () => {
      try {
        console.log(selectedType);
        if (selectedType !== "All") {
          let x = 0;
          for (let i = 0; i < data.length; i++) {
            if (data[i].name === selectedType) {
              x = i;
            }
          }

          const response = await fetch(data[x].url);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const parseResponse = await response.json();

          for (let i = 0; i < parseResponse.pokemon.length; i++) {
            const pokemonUrl = parseResponse.pokemon[i].pokemon.url;
            const pokemonResponse = await fetch(pokemonUrl);
            const pokemonData = await pokemonResponse.json();
            setDisplayData((prevData) => [...prevData, pokemonData]);
          }
        } else {
          fetchData();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      return selectedType;
    });
    console.log(typeData);
  };

  return (
    <header>
      <div className="logo">
        <img src={pokeDexImg} alt="logo" />
      </div>
      <div>
        <div>
          <p>Search by Type:</p>
          <select onChange={handleTypeChange}>
            <option>All</option>
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
          {isLoading && <div>Loading...</div>}
        </div>
        <div>
          <p>Search by Type:</p>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearchChange}>click</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
