import { UseDataContext } from "../../context/Context";

import { useEffect, useState } from "react";

function Compare() {
  const {
    favorites,
    setFavorites,
    setAbilityValue,
    compareData,
    setCompareData,
  } = UseDataContext();

  const [evolutionData, setEvolutionData] = useState([]);

  useEffect(() => {
    setAbilityValue(null);
    async function fetchEvolutionChain() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/evolution-chain/${compareData.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch evolution chain data");
        }
        const data = await response.json();
        if (data && data.chain) {
          const evolutionDataArray = [];
          traverseEvolutionChain(data.chain, evolutionDataArray);
          setEvolutionData(evolutionDataArray);
        }
      } catch (error) {
        console.error("Error fetching evolution chain data:", error);
      }
    }
    fetchEvolutionChain();
  }, []);

  const traverseEvolutionChain = (evolution, dataArray) => {
    dataArray.push(evolution.species.name);
    evolution.evolves_to.forEach((nextEvolution) => {
      traverseEvolutionChain(nextEvolution, dataArray);
    });
  };

  return (
    <>
      {" "}
      {compareData.length === 2 ? (
        <div className="details" style={{ gap: "10px" }}>
          {compareData.map((element) => (
            <div className="detailsMain-box" key={element.id}>
              <div
                className="inner-details"
                id={element.types.map((elem) => elem.type.name).join("-")}
              >
                <div className="details-box1">
                  <div className="details-box1-inner">
                    <div className="details-box1-id">
                      <h2>#{element.id}</h2>
                      <h2 style={{ textTransform: "capitalize" }}>
                        {element.name}
                      </h2>
                      {/* <span
              className={`material-symbols-outlined ${
                favorites.some((fav) => fav.id === element.id)
                  ? "favorite-active"
                  : ""
              }`}
              onClick={(event) => {
                event.preventDefault();
                toggleFavorite(element);
              }}
            >
              favorite
            </span> */}
                    </div>
                    <div
                      className="details-box1-img"
                      style={{ width: "150px" }}
                    >
                      <img
                        src={
                          element.sprites.other.dream_world.front_default ===
                          null
                            ? element.sprites.other.home.front_default
                            : element.sprites.other.dream_world.front_default
                        }
                        alt="img"
                      />
                    </div>
                    <div className="pokemon-types-inner2">
                      {element.types.map((elem, typeIndex) => (
                        <p key={typeIndex}>{elem.type.name}</p>
                      ))}
                    </div>

                    <div className="Hie-Wie">
                      <h3>Height 0.{element.height}m</h3>
                      <h3>Weight {element.weight}kg</h3>
                    </div>
                  </div>
                </div>
                <div className="details-box2">
                  <div className="details-box2-inner">
                    <div className="Abilities">
                      <h2>Abilities</h2>
                      <div className="Abilities-inner">
                        {" "}
                        {element.abilities.map((e, index) => (
                          <li key={index}>{e.ability.name}</li>
                        ))}
                      </div>
                    </div>

                    <div className="base-state">
                      <h2>Base Stats</h2>
                      <div className="base-state-box">
                        {element.stats.map((e, index) => (
                          <div className="inner-base-state-box" key={index}>
                            <p
                              style={{
                                color: "#ea412a",
                                textTransform: "capitalize",
                              }}
                            >
                              {e.stat.name}
                            </p>
                            <p>{e.base_stat}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="base-state">
                      <h2>Moves</h2>
                      <div className="base-state-box">
                        {element.moves.map((e, index) =>
                          index < 9 ? (
                            <div className="inner-base-state-box" key={index}>
                              <li>{e.move.name}</li>
                            </div>
                          ) : (
                            ""
                          )
                        )}
                      </div>
                    </div>
                    <div className="evolution">
                      <h2>Evolution</h2>
                      <div className="evolution-box">
                        {evolutionData.map((evolutionName, index) => (
                          <li key={index}>{evolutionName}</li>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 style={{ textAlign: "center", paddingTop: "4rem" }}>
          Add two Card
        </h1>
      )}
    </>
  );
}

export default Compare;
