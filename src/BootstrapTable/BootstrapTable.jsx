import React from "react";
import Select from '../Filters/Select'
import {idFilterData} from '../Filters/FiltersData'
import InputFilter from '../Filters/InputFilter'

export default function BootstrapTable({ data,setFilterId, idFilter, firsrNameFilter ,setFilterFirstName }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <p>ID</p>
            <Select value={idFilter} 
            handleSelectChange={setFilterId} 
            optionsArray={idFilterData}/>
          </th>
          <th>

          <p>FirstName</p>
            <InputFilter
            value={firsrNameFilter}
            handleInputChange={setFilterFirstName}
            />
          </th>

          <th>Last </th>
          <th>Email</th>
          <th>Phone</th>
          <th>Category</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          return (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.firstName}</td>
              <td>{row.lastName}</td>
              <td>{row.email}</td>
              <td>{row.phone}</td>
              <td>{row.category}</td>
              <td>{row.category}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
