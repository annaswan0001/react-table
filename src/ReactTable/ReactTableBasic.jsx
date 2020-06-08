import React, {useState, useEffect} from "react";
import fetchData from "../data";
import {
  useTable,
  useSortBy,
  usePagination,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";

// import tableData from "../data";
import matchSorter from "match-sorter";
function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}
export default function App() {
    const [tableData, setData] = useState([]);

    useEffect(() => {
      const fetch = setTimeout(() => {
        setData(fetchData);
      }, 2000);
      return () => clearInterval(fetch);
    }, [setData]);

    function DefaultColumnFilter({
        column: { filterValue, preFilteredRows, setFilter },
      }) {
        const count = preFilteredRows.length
      
        return (
          <input
            value={filterValue || ''}
            onChange={e => {
              setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} records...`}
          />
        )
      }
      
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
      });
      return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
      <select
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }



  const data = React.useMemo(() => tableData, [tableData]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Info",
        Footer: "Info",
        columns: [
          {
            Header: "First Name",
            accessor: "col1", // accessor is the "key" in the data
            // Footer: "First Name"
            disableFilters: true
          },
          {
            Header: "Name",
            accessor: "col2",
            // Footer: "Name"
            disableFilters: true
          },
          {
            Header: "FatherName",
            accessor: "col3",
            // Footer: "Father Name"
            // disableFilters: true
          },
        ],
      },

      {
        Header: "Age",
        Footer: "Age",
        columns: [
          {
            Header: "Age",
            accessor: "age",
            Footer: (info) => {
            //   console.log(info, "info");
              // Only calculate total visits if rows change
              const total = React.useMemo(
                () => info.rows.reduce((sum, row) => row.values.age + sum, 0),
                [info.rows]
              );

              return <>Total: {total}</>;
            },
            Filter: SelectColumnFilter,
          },
          {
            Header: "Date of Bitrh",
            accessor: "dateOfBitrh",
            Footer: "Bitrh",
            disableFilters: true
          },
        ],
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
 // Be sure to pass the defaultColumn option
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      defaultColumn,
      filterTypes,
      defaultCanFilter: false,
   
    },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  return (
    <>
      <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {console.log("reacttable")}
          {headerGroups.map(
            (headerGroup) => (
            //   console.log(headerGroup, "headerGroup"),
              (
                <tr {...headerGroup.getHeaderGroupProps()}>
                   
                  {headerGroup.headers.map(
                    (column) => (
                    //   console.log(column, "column"),
                      (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          style={{
                            border: "solid 1px black",
                            background: "aliceblue",
                            color: "black",
                            fontWeight: "bold",
                          }}
                        >
                          {column.render("Header")}
                          <div>{column.canFilter ? column.render('Filter') : null}</div>
                          {/* {console.log(column)} */}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      )
                    )
                  )}
                </tr>
              )
            )
          )}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            // console.log(row, "row");
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                //   console.log(cell, "cell");
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((group) => (
            <tr {...group.getFooterGroupProps()}>
              {group.headers.map((column) => (
                <td
                  style={{
                    padding: "10px",
                    border: "solid 1px gray",
                    background: "#fff",
                  }}
                  {...column.getFooterProps()}
                >
                  {column.render("Footer")}
                </td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>

      <div style={{ textAlign: "left" }}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[2, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      {/* {console.log(tableData,"newData")} */}
    </>
  );
}
