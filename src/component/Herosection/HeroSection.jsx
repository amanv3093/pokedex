import { UseDataContext } from "../../context/Context";
import { useState, useEffect } from "react";
import "./HeroSection.css";
import { NavLink } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

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
  } = UseDataContext();

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

  return (
    <div className="HeroSection">
      <InfiniteScroll
        dataLength={displayData.length}
        next={fetchMoreData}
        hasMore={typeData === "All" ? true : false}
        loader=<h1>loading..</h1>
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
