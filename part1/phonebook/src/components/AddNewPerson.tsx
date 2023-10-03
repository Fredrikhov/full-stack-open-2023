import React from "react";

interface IAddNewPerson {
  newName: string;
  newPhone: string | number;
  handleNameChanged?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhoneChanged?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const AddNewPerson = ({
  newName,
  newPhone,
  handleNameChanged,
  handlePhoneChanged,
  handleSubmit,
}: IAddNewPerson) => {
  return (
    <>
      <h3>Add a new</h3>
      <form>
        name: <input value={newName} onChange={handleNameChanged} />
        number: <input value={newPhone} onChange={handlePhoneChanged} />
        <button type="submit" onClick={handleSubmit}>Add</button>
      </form>
    </>
  );
};
