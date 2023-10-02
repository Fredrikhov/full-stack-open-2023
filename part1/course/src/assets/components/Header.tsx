import h_style from "./Header.module.css"

interface HeaderProp {
  courseName: string;
}
export const Header = ({ courseName }: HeaderProp) => {
  return <h1 className={h_style.h1}>{courseName}</h1>;
};
