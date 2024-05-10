import { useEffect } from "react";
import { UseDataContext } from "../context/Context";

function Wishlist() {
  const { favorites, setFavorites } = UseDataContext();
  const removeFromWishlist = (pokemonId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== pokemonId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", padding: "1rem 0px" }}>
        Pokédex Wishlist
      </h1>
      <ul className="infinite-scroll-component">
        {favorites.length > 0 ? (
          favorites.map((pokemon, index) => (
            <li key={pokemon.id} style={{ listStyle: "none" }}>
              <div
                className="pokemon_boxes"
                id={pokemon.types.map((elem) => elem.type.name).join("-")}
              >
                <div className="pokemon-id">
                  <span>#{pokemon.id}</span>
                  <span
                    className="material-symbols-outlined"
                    onClick={() => removeFromWishlist(pokemon.id)}
                  >
                    close
                  </span>
                </div>
                <div className="pokemon-img">
                  <img
                    src={
                      pokemon.sprites.other.dream_world.front_default === null
                        ? pokemon.sprites.other.home.front_default
                        : pokemon.sprites.other.dream_world.front_default
                    }
                    alt={`Pokemon ${index}`}
                  />
                </div>
                <div className="pokemon-name">
                  <h2>{pokemon.species.name}</h2>
                </div>
                <div className="pokemon-types">
                  {pokemon.types.map((type, typeIndex) => (
                    <div className="pokemon-types-inner" key={typeIndex}>
                      <p>{type.type.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </li>
          ))
        ) : (
          <h1 style={{ paddingTop: "4rem" }}>Empty!!</h1>
        )}
      </ul>
    </div>
  );
}

export default Wishlist;
