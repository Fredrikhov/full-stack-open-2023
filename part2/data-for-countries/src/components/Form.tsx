interface IForm {
  handleSearchChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Form = ({ handleSearchChanged }: IForm) => {
  return (
    <form>
      <input onChange={handleSearchChanged} />
    </form>
  );
};
