import { UseDataContext } from "../../context/Context";
import { useEffect, useState } from "react";
import "./HeroSection.css";
import { NavLink } from "react-router-dom";

function HeroSection() {
  const { displayData, setDisplayData, setDetailsData, fetchData, loading } =
    UseDataContext();
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  return (
    <div className="HeroSection">
      {displayData &&
        displayData.slice(0, page * 20).map((e, index) => (
          <NavLink
            to="/details"
            key={index}
            onClick={() => setDetailsData(e)}
            className="pokemon_boxes"
            id={e.types.map((elem, typeIndex) => elem.type.name).join("-")}
            // style={{
            //   background: e.types[0].type.name === "grass" ? "green" : "orange",
            // }}
          >
            <div>
              <div className="pokemon-id">
                <span>#{e.id}</span>
                <span class="material-symbols-outlined">favorite</span>
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

      {loading && <p>Loading...</p>}
    </div>
  );
}

export default HeroSection;
