import { StatisticsDisplay } from "./StatisticsDisplay";

interface StatisticsProps {
  feedBack: number[];
}

export const Statistics = ({ feedBack }: StatisticsProps) => {
  const [bad, neutral, good, total] = feedBack;
  const average = () => (good - bad) / total;
  const positive = () => (good / total) * 100;
  return (
    <>
      <h2>Statistics</h2>
      {total === 0 ? (
        "No FeedBack Given"
      ) : (
        <table>
          <StatisticsDisplay text="Good" feedback={good} />
          <StatisticsDisplay text="Neutral" feedback={neutral} />
          <StatisticsDisplay text="Bad" feedback={bad} />
          <StatisticsDisplay text="Average" feedback={average()} />
          <StatisticsDisplay text="positive" feedback={positive()} />
        </table>
      )}
    </>
  );
};
