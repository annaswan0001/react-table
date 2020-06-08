import React, { useState, useEffect, useCallback, useMemo } from "react";
import BootstrapTable from "./BootstrapTable";
import Search from "../Search/Search";
import useFetchHook from "../useFetchHook";
import { idFilterData } from "../Filters/FiltersData";

export default function BootstrapTableContainer() {
  const [filterValue, setFilterValue] = useState("");
  const [idFilter, setIdFilter] = useState("all");
  const [firsrNameFilter, setFirstNameFilter] = useState("");
  const [data, loading, error, setError] = useFetchHook(
    `http://www.filltext.com/?rows=${20}&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&category=[1,2]&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`,
    []
  );
  const [dataTable, setDataTable] = useState(data);

  //general filter
  useEffect(() => {
    setDataTable(data);
  }, [data]);

  const filterChange = useCallback(
    (value) => {
      setFilterValue(value);
    },
    [setFilterValue]
  );

  useEffect(() => {
    if (!filterValue) {
      setDataTable(data);
    } else {
      const newData = data.filter((obj) => {
        return Object.keys(obj).some((key) => {
          if (typeof obj[key] === "string" || "number") {
            return obj[key]
              .toString()
              .toLowerCase()
              .trim()
              .includes(filterValue.toLowerCase().trim());
          }
        });
      });
      setDataTable(newData);
    }
  }, [filterValue, setDataTable, data]);

  //idFilter
  const setFilterId = useCallback((value) => {
    setIdFilter(value);
  }, setIdFilter);

  useEffect(() => {
    let newData;
    switch (idFilter) {
      case "all":
        newData = [...dataTable];
        break;
      case "0":
        newData = dataTable.filter((obj) => {
          return obj.id >= 0 && obj.id < 300;
        });
        break;
      case "300":
        newData = dataTable.filter((obj) => {
          return obj.id >= 300 && obj.id < 600;
        });
        break;
      case "600":
        newData = dataTable.filter((obj) => {
          return obj.id >= 600 && obj.id <= 1000;
        });
        break;
      default:
        break;
    }
    if (!firsrNameFilter) {
       newData = [...newData]
    } else {
       newData = newData.filter((obj) => {
        return obj.firstName
          .toLowerCase()
          .includes(firsrNameFilter.toLowerCase());
      });
     
    }
    setDataTable(newData);
  }, [idFilter, setDataTable, firsrNameFilter]);

  //nameFilter
  const setFilterFirstName = useCallback((value) => {
    setFirstNameFilter(value);
  }, setFirstNameFilter);


  const searchComponent = useMemo(() => {
    return <Search onChangeFilter={filterChange} filterValue={filterValue} />;
  }, [filterChange, filterValue]);

  const bootstrapTable = useMemo(() => {
    return (
      <BootstrapTable
        idFilter={idFilter}
        setFilterId={setFilterId}
        firsrNameFilter={firsrNameFilter}
        setFilterFirstName={setFilterFirstName}
        data={dataTable}
      />
    );
  }, [dataTable, idFilter, setFilterId, firsrNameFilter, setFilterFirstName]);



  return (
    <div>
      {searchComponent}
      {bootstrapTable}
    </div>
  );
}
