import { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

export const UseDataContext = () => {
  return useContext(DataContext);
};

export const DataContextProvider = (props) => {
  const [data, setData] = useState([]);
  const [typeData, setTypeData] = useState("All");
  const [displayData, setDisplayData] = useState([]);
  const [detailsData, setDetailsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState([]);
  const [globalData, setGlobalData] = useState([]);
  const [abilityValue, setAbilityValue] = useState(null);
  // const [newTypeData, SetNewTypeData] = useState("All");
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);

  async function fetchData(page) {
    setLoading(true);

    try {
      let response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 10}`
      );

      let parsedResponse = await response.json();
      const pokemonUrls = parsedResponse.results.map((result) => result.url);
      const pokemonData = await Promise.all(
        pokemonUrls.map(async (url) => {
          const pokemonResponse = await fetch(url);
          if (!pokemonResponse.ok) {
            throw new Error("Network response was not ok");
          }
          return pokemonResponse.json();
        })
      );
      setDisplayData((prevData) => [...prevData, ...pokemonData]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchData2() {
      const response = await fetch("https://pokeapi.co/api/v2/type/");
      const parseResponse = await response.json();
      setData(parseResponse.results);

      let response33 = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=400&offset=0}`
      );

      let parsedResponse33 = await response33.json();
      const pokemonUrls = parsedResponse33.results.map((result) => result.url);
      const pokemonData = await Promise.all(
        pokemonUrls.map(async (url) => {
          const pokemonResponse = await fetch(url);
          if (!pokemonResponse.ok) {
            throw new Error("Network response was not ok");
          }
          return pokemonResponse.json();
        })
      );
      setGlobalData(pokemonData);
      // console.log("pokemonData", pokemonData);
    }

    fetchData2();
    fetchData(1);
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        setTypeData,
        typeData,
        displayData,
        setDisplayData,
        detailsData,
        setDetailsData,
        setLoading,
        loading,
        fetchData,
        searchFilter,
        globalData,
        page,
        setPage,
        favorites,
        setFavorites,
        abilityValue,
        setAbilityValue,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
