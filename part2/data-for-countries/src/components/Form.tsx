interface IForm {
    searchText:string;
    handleSearchChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Form = ({searchText, handleSearchChanged}: IForm) => {
    return(
        <form>
            <input value={searchText} onChange={handleSearchChanged}/>
        </form>
    )
}