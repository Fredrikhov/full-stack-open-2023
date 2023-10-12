export const SearchResult = ({ arr }) => {
  if (arr.length > 0) {
    return arr.length >= 10 ? (
      <p>Too many matches, specify another filter</p>
    ) : (
      arr.map((land, index) => {
        return <div key={index}>{land}</div>;
      })
    );
  } else {
    return <div>No countries found, try another name</div>;
  }
};
