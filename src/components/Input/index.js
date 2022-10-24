import './style.css'

export const Input = ({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value
}) => (
  <div className='form_container'>
    <label htmlFor={name}>{text}</label>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      id={name}
      onChange={handleOnChange}
    />
  </div>
);
