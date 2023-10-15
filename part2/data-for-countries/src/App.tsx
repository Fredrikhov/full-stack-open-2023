import { useEffect, useState } from "react";
import "./App.css";
import { Form } from "./components/Form";
import { getAll } from "./services/fetchData";
import { SearchResult } from "./components/SearchResult";

export interface LandInfo {
  name: {
    common: string;
    official: string;
    nativeName: {
      ara: {
        official: string;
        common: string;
      };
    };
  };
  capital: string[];
  languages: {
    language: string;
  };
  flags: {
    png: string;
  };
}

export const App = () => {
  const [lands, setLands] = useState<Partial<LandInfo>[]>([]);
  const [filteredLand, setFilteredLand] = useState<Partial<LandInfo>[]>([]);

  // render after first OnMount
  useEffect(() => {
    getAllCountries();
  }, []);

  const getAllCountries = () => {
    try {
      getAll(`https://studies.cs.helsinki.fi/restcountries/api/all`).then(
        (response) => setLands(response)
      );
    } catch (er) {
      console.log(`ERROR: ${er} `);
    } finally {
      console.log("Finally clause");
    }
  };

  const filterSearch = (param: string) => {
    if (lands) {
      const res = lands.filter((land) =>
        land.name?.common.toLowerCase().match(param)
      );
      setFilteredLand(res);
    }
  };

  const handleSearchChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterSearch(e.target.value.toLowerCase());
  };

  /** TODO:
   * debounce på handlesearch (throttle)
   *  hvis ikke - hent alle land - ondemand api call
   *
   *
   * 1. debounce uten api-call
   *    her antar man etter ? sekunder at søket er stavet korrekt
   *  2. debouce m/ api call
   *    etter x sekunder hent data - filterer ut ifra søketekst
   *  3. debounce m/ riktig søk.
   *
   * 4. flytt alle logikk og data inn i en context -
   *
   */

  return (
    <>
      <h1>Hellu world</h1>
      <Form handleSearchChanged={handleSearchChanged} />
      <SearchResult filteredLand={filteredLand} />
      {/* <Weather land="London" /> */}
    </>
  );
};
