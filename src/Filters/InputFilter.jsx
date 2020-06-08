import React from 'react'

export default function InputFilter({value, handleInputChange}) {
    const onChange = (e)=>{
        handleInputChange(e.target.value)
    }
    return (
        <div>
            <input type="text" value={value} onChange={onChange}/>
        </div>
    )
}
