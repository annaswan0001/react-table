import React from "react";

export default function RadioFilter({ handleRadioChange, value }) {
  const onChange = (e) => {
    handleRadioChange(e.target.value);
  };
  return (
    <div>
          <input type="radio" name="radioFilter" checked={value===""} value="" onChange={onChange} />
      <label className="pr-2" for="2">
        All
      </label>
      <input type="radio" name="radioFilter" value="1" onChange={onChange} checked={value==="1"} />
      <label className="pr-2" for="1">
        1
      </label>
      <input type="radio" name="radioFilter" value="2" onChange={onChange} checked={value==="2"} />
      <label className="pr-2" for="2">
        2
      </label>
    

      <br></br>
    </div>
  );
}
