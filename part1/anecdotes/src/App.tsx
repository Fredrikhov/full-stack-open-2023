import { useState } from "react";
import style from "./App.module.css";

export const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState<number>(0);
  const [arrWithPoints, setArrWithPoints] = useState<number[]>(
    Array(anecdotes.length).fill(0)
  );

  const handleClickGenerateRandomNum = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const handleClickVote = () => {
    const copy = [...arrWithPoints];
    copy[selected] += 1;
    setArrWithPoints(copy);
  };


  const highestPointQuote = () => Math.max(...arrWithPoints);

  return (
    <>
      <div>
        <h1 className={style.header}>Anecdote of the day</h1>
        <p className={style.p}>{anecdotes[selected]}</p>
        <p>Has {arrWithPoints[selected]} votes</p>
      </div>
      <button className={style.buttonSpace}onClick={handleClickVote}>Vote</button>
      <button onClick={handleClickGenerateRandomNum}>Get New Quote</button>
      <h2 className={style.header}>Anecdotes with the most votes</h2>
      <p>{anecdotes[arrWithPoints.indexOf(highestPointQuote())]}</p>
      <p>has {highestPointQuote()} votes</p>
    </>
  );
};
