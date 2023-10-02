interface HeaderProps {
  text: string;
}

export const Header = ({ text }: HeaderProps) => {
  return <h1>{text}</h1>;
};
