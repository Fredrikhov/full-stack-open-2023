import { useEffect, useState } from "react";
import "./App.css";
import { Form } from "./components/Form";
import { getAll } from "./services/fetchData";
import { SearchResult } from "./components/searchResult";

interface LandInfo {
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
}

export const App = () => {
  const [search, setSearch] = useState(null || "");
  const [lands, setLands] = useState<Partial<LandInfo>[]>([]);
  // !!! TODO: Fix issue with any
  //const [arr, setArr] = useState<any[]>([]); 
  const [arr, setArr] = useState<any[]>([]);

  // render after first init render
  useEffect(() => {
    if (lands.length === 0) {
      getCountriesFromSearch();
    }
  }, []);

  const getCountriesFromSearch = () => {
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
    // !!! 
    const res = lands
      .map((land) => land.name?.common.toLowerCase())
      .filter((land) => land?.match(param));
    if(res !== undefined){ 
      setArr(res);  
    } else {
      setArr([]);
    }
    console.log(res);
  };

  const handleSearchChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    filterSearch(e.target.value.toLowerCase());
  };

  return (
    <>
      <h1>Hellu world</h1>
      <Form searchText={search} handleSearchChanged={handleSearchChanged} />
      <SearchResult arr={arr} />
    </>
  );
};
