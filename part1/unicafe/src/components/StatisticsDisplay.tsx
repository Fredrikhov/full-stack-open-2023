interface StatisticsDisplayProps {
  text: string;
  feedback: number;
}

export const StatisticsDisplay = ({ text, feedback }: StatisticsDisplayProps) => {
  return (
    <tbody>
      <tr>
        <td>{text} {feedback}</td>
      </tr>
    </tbody>
  );
};
