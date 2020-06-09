import React, { useState, useEffect, useCallback, useMemo } from "react";
import BootstrapTable from "./BootstrapTable";
import Search from "../Search/Search";
import useFetchHook from "../useFetchHook";
import data from '../data'


export default function BootstrapTableContainer() {
  const [filterValue, setFilterValue] = useState("");
  const [idFilter, setIdFilter] = useState("all");
  const [firsrNameFilter, setFirstNameFilter] = useState("");
  const [categoriesFilter, setCategoriesFilter] = useState("");
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
    (value) => {setFilterValue(value);
    },[setFilterValue]
  );

  useEffect(() => {
    if (!filterValue) {
      setDataTable(data)
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
  }, [setIdFilter]);

 //nameFilter
 const setFilterFirstName = useCallback((value) => {
  setFirstNameFilter(value);
}, [setFirstNameFilter]);

 //categoriesFilter
 const setFilterCategories = useCallback((value) => {
  setCategoriesFilter(value);
}, [setCategoriesFilter]);


  useEffect(() => {
    let idData 
    switch (idFilter) {
      case "all":
        idData = [...data]
        console.log(idData, "idData")
        break;
      case "0":
        idData = data.filter((obj) => {
          return obj.id >= 0 && obj.id < 300;
        });
        console.log(idData, "idData")
        break;
      case "300":
        idData = data.filter((obj) => {
          return obj.id >= 300 && obj.id < 600;
        });
        console.log(idData, "idData")
        break;
      case "600":
        idData = data.filter((obj) => {
          return obj.id >= 600 && obj.id <= 1000;
        });
        console.log(idData, "idData")
        break;
      default:
        break;
    }
    let nameData 
    if (!firsrNameFilter) {
      nameData = [...data]
    } else {
      nameData = data.filter((obj) => {
        return obj.firstName
          .toLowerCase()
          .includes(firsrNameFilter.toLowerCase());
      });
     
    }

     let categoriesData
     if (!categoriesFilter) {
      categoriesData = [...data]
    } else {
      categoriesData = data.filter((obj) => {
        return obj.category
          .toString()
          .includes(categoriesFilter);
      });
     
    }

    let newData = data
    .filter(item => nameData.includes(item))
    .filter(item =>idData.includes(item))
    .filter(item =>categoriesData.includes(item))
    setDataTable(newData);
  }, [idFilter, setDataTable, firsrNameFilter, categoriesFilter]);

 


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
        categoriesFilter={categoriesFilter}
        setFilterCategories = {setFilterCategories}
        data={dataTable}
      />
    );
  }, [dataTable, idFilter, setFilterId, firsrNameFilter, setFilterFirstName, setFilterCategories, categoriesFilter ]);



  return (
    <div>
      {searchComponent}
      {bootstrapTable}
    </div>
  );
}
