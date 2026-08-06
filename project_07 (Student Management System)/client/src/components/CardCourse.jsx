import CourseImage from '../assets/image.png';

export default function CardCourse({ name, room }) {
  return (
    <figure>
      <img src={CourseImage} alt="Course-Image" />

      <h3>{name}</h3>

      <p>room: {room}</p>
    </figure>
  );
}
