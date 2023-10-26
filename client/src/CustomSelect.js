import React from 'react';

function CustomSelect({ value, options, onChange }) {
    console.log(options)
  return (
    <div>
      <label>Select a speciality: </label>
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p>Selected Option: {value}</p>
    </div>
  )
}

export default CustomSelect;