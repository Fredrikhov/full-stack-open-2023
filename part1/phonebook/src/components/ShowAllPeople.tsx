interface IShowAllPeople {
  persons: {
    id: number;
    name: string;
    phoneNumber: number | string;
  }[];
}

export const ShowAllPeople = ({ persons }: IShowAllPeople) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => {
          return (
            <li key={person.id}>{`${person.name} ${person.phoneNumber}`}</li>
          );
        })}
      </ul>
    </>
  );
};
