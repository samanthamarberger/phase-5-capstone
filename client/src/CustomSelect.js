import React from 'react';

function CustomSelect({ value, options, onChange }) {
    const objectOptions = options.map((option) => {
        return {
            id: option[0],
            name: option[1],
        }
    })
  return (
    <div>
      <label>Select a speciality: </label>
      <select value={value} onChange={onChange}>
        {objectOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CustomSelect;