import React from 'react'

export default function Search({onChangeFilter, filterValue}) {
    const onChangeInput = (e) =>{
        onChangeFilter(e.target.value)
    }
    return (
        <div>
            <input onChange={onChangeInput} value={filterValue} type="text"/>
        </div>
    )
}
