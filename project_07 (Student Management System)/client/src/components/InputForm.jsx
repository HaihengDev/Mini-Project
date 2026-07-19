export default function InputForm({ inputElements }) {
  return (
    <form>
      {inputElements.map((el) => (
        <div>
          {el.label}
          {el.element}
        </div>
      ))}
    </form>
  );
}
