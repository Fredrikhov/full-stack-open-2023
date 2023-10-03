import React from "react";

interface ISearchFilter {
  searchText:string;
  handleSearchChanged?:(e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchFilter = ({ searchText, handleSearchChanged }: ISearchFilter) => {
  return (
    <div>
      Filter shown with <input value={searchText} onChange={handleSearchChanged}/>
    </div>
  )
}