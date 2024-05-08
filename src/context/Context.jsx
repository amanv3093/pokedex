// Context.js
import { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

export const UseDataContext = () => {
  return useContext(DataContext);
};

export const DataContextProvider = (props) => {
  const [boxBgColor, setBoxBgColor] = useState([
    {
      grass: "green",
    },
  ]);
  const [data, setData] = useState([]);
  const [typeData, setTypeData] = useState("All");
  const [displayData, setDisplayData] = useState([]);
  const [detailsData, setDetailsData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(detailsData);
  async function fetchData(page) {
    setLoading(true);
    try {
      let response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
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
    }
    fetchData2();
    fetchData(1);
  }, []);
  console.log(displayData);
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
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
