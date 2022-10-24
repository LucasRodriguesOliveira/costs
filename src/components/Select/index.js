import './style.css'

export const Select = ({
  text,
  name,
  options,
  handleOnChange = () => {},
  value = 0,
}) => (
  <div className='form_container'>
    <label htmlFor={name}>{text}</label>
    <select
      name={name}
      value={value}
      id={name}
      onChange={handleOnChange}
    >
      <option disabled value={0}>Select an option</option>
      {options && options.map((option) => (
        <option
          value={option.id}
          key={option.id}
        >{ option.description }</option>
      ))}
    </select>
  </div>
);
