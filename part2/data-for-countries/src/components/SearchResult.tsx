import { useState } from "react";
import { LandInfo } from "../App";

interface ISearchResult {
  filteredLand: Partial<LandInfo>[];
}

export const SearchResult = ({ filteredLand }: ISearchResult) => {
  const [clicked, setClicked] = useState(false);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    //console.log(e.currentTarget.value);
    showClickedElement(e.currentTarget.value);
  };

  const showClickedElement = (id: string) => {
    setClicked(true);
    console.log(filteredLand[parseInt(id)]);
    return (
      <>
        <p>Hellu</p>
      </>
    );
  };

  if (filteredLand.length > 1) {
    return filteredLand.length >= 10 ? (
      <p>Too many matches, specify another filter</p>
    ) : (
      filteredLand.map((land, index) => {
        return (
          <div key={index}>
            {land.name?.common}
            <button value={index} onClick={handleClick}>
              Show{clicked}
            </button>
          </div>
        );
      })
    );
  } else if (filteredLand.length === 1) {
    return (
      <>
        <h1>{filteredLand[0].name?.common}</h1>
        <p>Capitol: {filteredLand[0].capital}</p>
        {/* TODO: Legge inn språk */}
        <img src={filteredLand[0].flags?.png}></img>
      </>
    );
  } else {
    return <p>Nothing found, reenter new search</p>;
  }
};
