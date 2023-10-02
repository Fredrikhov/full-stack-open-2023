interface ButtonProps {
  handleClick: () => void;
  text: string;
}
export const Button = ({ handleClick, text }: ButtonProps) => {
  return <button onClick={handleClick}>{text}</button>;
};
