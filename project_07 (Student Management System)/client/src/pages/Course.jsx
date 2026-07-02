import CourseList from '../components/CourseList.jsx';
import FormInput from '../components/FormInput.jsx';
import { courseForm } from '../config/inputForm.js';

const Page = () => {
  return (
    <section id="course-container">
      <CourseList />

      <form>
        {courseForm.map((form) => (
          <FormInput
            key={`${form.id}`}
            id={form.id}
            label={form.label}
            htmlFor={form.htmlFor}
            type={form.type}
            placeholder={form.placeholder}
          />
        ))}
      </form>
    </section>
  );
};

export default Page;
