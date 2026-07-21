import './style/input-form.css';

export default function InputForm({ inputElements }) {
  return (
    <form className="form-wrapper">
      {inputElements.map((input) => (
        <div className="form-group" key={input.id}>
          <label className="form-label" htmlFor={input.id}>
            {input.label}
          </label>

          {input.type === 'academic_year' ? (
            <div className="academic-year-group">
              <input
                className="form-input"
                type="number"
                name="academic_year_start"
                placeholder="2025"
              />

              <span>-</span>

              <input
                className="form-input"
                type="number"
                name="academic_year_end"
                placeholder="2026"
              />
            </div>
          ) : input.type === 'radio' ? (
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
              name={input.id}
              placeholder={input.placeholder}
            />
          )}
        </div>
      ))}
    </form>
  );
}
