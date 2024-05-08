import "./Details.css";
import { UseDataContext } from "../../context/Context";
import { useEffect, useState } from "react";

function Details() {
  const { detailsData } = UseDataContext();

  const [evolutionData, setEvolutionData] = useState([]);

  useEffect(() => {
    async function fetchEvolutionChain() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/evolution-chain/${detailsData.id}`
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
    <div className="details">
      <div
        className="inner-details"
        id={detailsData.types
          .map((elem, typeIndex) => elem.type.name)
          .join("-")}
      >
        <div className="details-box1">
          <div className="details-box1-id">
            <h2>#{detailsData.id}</h2>
            <h2>{detailsData.name}</h2>
          </div>
          <div className="details-box1-img">
            <img
              src={
                detailsData.sprites.other.dream_world.front_default === null
                  ? detailsData.sprites.other.home.front_default
                  : detailsData.sprites.other.dream_world.front_default
              }
              alt="img"
            />
          </div>
          <div className="pokemon-types-inner2">
            {detailsData.types.map((elem, typeIndex) => (
              <p key={typeIndex}>{elem.type.name}</p>
            ))}
          </div>

          <div className="Hie-Wie">
            <h3>Height 0.{detailsData.height}m</h3>
            <h3>Weight {detailsData.weight}kg</h3>
          </div>
        </div>
        <div className="details-box2">
          <div className="details-box2-inner">
            <div className="Abilities">
              <h2>Abilities</h2>
              <div className="Abilities-inner">
                {" "}
                {detailsData.abilities.map((e, index) => (
                  <li key={index}>{e.ability.name}</li>
                ))}
              </div>
            </div>

            <div className="base-state">
              <h2>Base Stats</h2>
              <div className="base-state-box">
                {detailsData.stats.map((e, index) => (
                  <div className="inner-base-state-box" key={index}>
                    <p
                      style={{ color: "#ea412a", textTransform: "capitalize" }}
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
                {detailsData.moves.map((e, index) =>
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
  );
}

export default Details;
