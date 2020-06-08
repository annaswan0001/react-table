import React from "react";

export default function Select({ optionsArray, value, handleSelectChange }) {
  
    const onChange = (e) => {
    handleSelectChange(e.target.value);
  
  };

  return (
    <div>
      <select value={value} onChange={onChange}>
        {optionsArray.map((optionItem) => (
          <option key={optionItem.value} value={optionItem.value}>
            {optionItem.label}
          </option>
        ))}
      </select>
    </div>
  );
}
