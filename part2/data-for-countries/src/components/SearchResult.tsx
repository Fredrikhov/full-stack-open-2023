import { useState } from "react";
import { LandInfo } from "../App";
import { Weather } from "./Wather";

interface ISearchResult {
  filteredLand: Partial<LandInfo>[];
}

export const SearchResult = ({ filteredLand }: ISearchResult) => {
  const [clicked, setClicked] = useState(false); // legge denne i app.tsx?
  const [valueOfElem, setValueOfElem] = useState(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (clicked) {
      setClicked(false);
    } else {
      setClicked(true);
      setValueOfElem(parseInt(e.currentTarget.value));
    }
  };

  const showLand = () => {
    return (
      <div>
        <button onClick={handleClick}>Go back</button>
        <p>{filteredLand[valueOfElem].name?.common}</p>
        <p>{filteredLand[valueOfElem].capital}</p>
        <img src={filteredLand[valueOfElem].flags?.png} />
      </div>
    );
  };

  if (filteredLand.length > 1) {
    return filteredLand.length >= 10 ? (
      <p>Too many matches, specify another filter</p>
    ) : (
      (!clicked &&
        filteredLand.map((land, index) => {
          return (
            <div key={index}>
              {land.name?.common}
              <button key={index} value={index} onClick={handleClick}>
                Show
              </button>
            </div>
          );
        })) ||
        (clicked && showLand())
    );
  } else if (filteredLand.length === 1) {
    const resolved = filteredLand[0];
    return (
      <>
        <h1>{resolved.name?.common}</h1>
        <p>Capitol: {resolved.capital}</p>
        <p>
          Language:{" "}
          {resolved.languages &&
            Object.values(resolved.languages).map((language) => language + " ")}
        </p>
        <img src={resolved.flags?.png}></img>
        <Weather land={resolved.name?.common} />
      </>
    );
  } else {
    return <p>Nothing found</p>;
  }
};
