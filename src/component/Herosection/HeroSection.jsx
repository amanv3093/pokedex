import { UseDataContext } from "../../context/Context";
import { useState, useEffect } from "react";
import "./HeroSection.css";
import { NavLink } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import loader from "../../assets/Spinner@1x-1.0s-200px-200px.gif";

function HeroSection() {
  const {
    displayData,
    setDetailsData,
    fetchData,
    typeData,
    page,
    setPage,
    favorites,
    setFavorites,
    compareData,
    setCompareData,
  } = UseDataContext();

  console.log(compareData);

  const [checkedItems, setCheckedItems] = useState({});

  const fetchMoreData = () => {
    fetchData(page + 1);
    setPage(page + 1);
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemon) => {
    const isFavorite = favorites.some((fav) => fav.id === pokemon.id);

    if (!isFavorite) {
      const updatedFavorites = [...favorites, pokemon];
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = favorites.filter((fav) => fav.id !== pokemon.id);
      setFavorites(updatedFavorites);
    }
  };

  const toggleCompare = (pokemon) => {
    if (compareData.length < 2) {
      const isComparable = compareData.some((comp) => comp.id === pokemon.id);

      if (!isComparable) {
        const updatedCompareData = [...compareData, pokemon];
        setCompareData(updatedCompareData);
      } else {
        const updatedCompareData = compareData.filter(
          (comp) => comp.id !== pokemon.id
        );
        setCompareData(updatedCompareData);
      }
    } else {
      const updatedCompareData = compareData.filter(
        (comp) => comp.id !== pokemon.id
      );
      setCompareData(updatedCompareData);
    }
  };

  const handleCheckboxChange = (event, pokemon) => {
    event.preventDefault();

    const isChecked = !checkedItems[pokemon.id];
    setCheckedItems({ ...checkedItems, [pokemon.id]: isChecked });
    toggleCompare(pokemon);
  };

  return (
    <div className="HeroSection">
      <InfiniteScroll
        dataLength={displayData.length}
        next={fetchMoreData}
        hasMore={typeData === "All" ? true : false}
        loader={<img src={loader} />}
      >
        {displayData &&
          displayData.map((e, index) => (
            <NavLink
              to="/details"
              key={index}
              onClick={() => setDetailsData(e)}
              className="pokemon_boxes"
              id={e.types.map((elem) => elem.type.name).join("-")}
            >
              <div>
                <div className="pokemon-id">
                  <span>#{e.id}</span>
                  <div>
                    <span
                      className={`material-symbols-outlined ${
                        favorites.some((fav) => fav.id === e.id)
                          ? "favorite-active"
                          : ""
                      }`}
                      onClick={(event) => {
                        event.preventDefault();
                        toggleFavorite(e);
                      }}
                    >
                      favorite
                    </span>
                    {/* <span
                      onClick={(event) => handleCheckboxChange(event, e)}
                      className={`material-symbols-outlined ${
                        compareData.some((fav) => fav.id === e.id)
                          ? "compareData-active"
                          : ""
                      }`}
                    >
                      check_box_outline_blank
                    </span> */}
                  </div>
                </div>
                <div className="pokemon-img">
                  <img
                    src={
                      e.sprites.other.dream_world.front_default === null
                        ? e.sprites.other.home.front_default
                        : e.sprites.other.dream_world.front_default
                    }
                    alt={`Pokemon ${index}`}
                  />
                </div>
                <div className="pokemon-name">
                  <h2>{e.species.name}</h2>
                </div>
                <div className="pokemon-types">
                  {e.types.map((elem, typeIndex) => (
                    <div className="pokemon-types-inner" key={typeIndex}>
                      <p>{elem.type.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </NavLink>
          ))}
      </InfiniteScroll>
    </div>
  );
}

export default HeroSection;
