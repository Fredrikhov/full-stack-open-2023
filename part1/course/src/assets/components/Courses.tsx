import { Header } from "./Header";
import styles from "./Courses.module.css";

interface CoursesProps {
  courses: {
    id: number;
    name: string;
    parts: CourseData[];
  }[];
}
type CourseData = {
  name: string;
  exercises: number;
  id: number;
};
export const Courses = ({ courses }: CoursesProps) =>
  courses.map((course) => (
    <ul className={styles.li} key={course.id}>
      <Header courseName={course.name} />
      {course.parts.map((part) => (
        <li key={part.id}>{`${part.name} ${part.exercises}`}</li>
      ))}
      <p className={styles.p}>{`Total of ${course.parts.reduce(
        (acc, cur) => acc + cur.exercises,
        0
      )} exercises`}</p>
    </ul>
  ));
