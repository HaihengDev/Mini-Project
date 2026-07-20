import './style/input-form.css';

export default function InputForm({ inputElements }) {
  return (
    <form className="form-wrapper">
      {inputElements.map((input) => (
        <div className="form-group" key={input.id}>
          <label className="form-label" htmlFor={input.id}>
            {input.label}
          </label>

          {input.type === 'radio' ? (
            <div className="radio-group">
              {input.options.map((option) => (
                <label className="radio-label" key={option.value}>
                  <input type="radio" name={input.id} value={option.value} />
                  {option.label}
                </label>
              ))}
            </div>
          ) : (
            <input
              className="form-input"
              type={input.type}
              id={input.id}
              placeholder={input.placeholder}
            />
          )}
        </div>
      ))}
    </form>
  );
}
