import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Button } from "./components/Button";
import { Statistics } from "./components/Statistics";

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    console.log(good);
  }, [good]);

  const handleClickGood = () => {
    setGood(good + 1);
    setTotal(total + 1);
  };

  const handleClickBad = () => {
    setBad(bad + 1);
    setTotal(total + 1);
  };

  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
  };

  return (
    <>
      <Header text="Give Feedback" />
      <Button text="Good" handleClick={handleClickGood} />
      <Button text="Neutral" handleClick={handleClickNeutral} />
      <Button text="Bad" handleClick={handleClickBad} />
      <Statistics feedBack={[bad, neutral, good, total]}/>
    </>
  );
};
