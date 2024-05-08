// Context.js
import { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

export const UseDataContext = () => {
  return useContext(DataContext);
};

export const DataContextProvider = (props) => {
  // const [boxBgColor,setBoxBgColor] = useState([{
  //   normal:"gray"
  // }])
  const [data, setData] = useState([]);
  const [typeData, setTypeData] = useState("All");
  const [displayData, setDisplayData] = useState([]);
  const [detailsData, setDetailsData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
console.log(detailsData);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://pokeapi.co/api/v2/type/");
      const parseResponse = await response.json();
      setData(parseResponse.results);
    }
    fetchData();
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
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
