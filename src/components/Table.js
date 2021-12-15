import React, {useState, useEffect, useMemo } from "react";
import Buttons from "./Buttons"
import { useSelector, useDispatch } from "react-redux";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

//Importing column fields for table attributes
import { COLUMNS } from "./Column";

//importing search component
import SearchFilter from "./SearchFilter";

import { getData } from "../redux/actions/data";


const Table = () => {
  //INITIALIZE_DISPATCH
  const dispatch = useDispatch();

  //REDUX_STATE
  const items = useSelector((state) => state.data.data);

  //DISPATCHING ACTION
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);


  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => items, [items]);

  //Creating Table Instance
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  //Destructuring Properties and Methods from TableInstance
  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state,
    pageOptions,
    gotoPage,
    setPageSize,
    setGlobalFilter,
  } = tableInstance;
  const { pageIndex, pageSize } = state;
  const { globalFilter } = state;


//GET STATE VALUE FROM LOCALSTORAGE
const [show,setShow] = useState(false)
useEffect(()=>{
 setShow(JSON.parse(localStorage.getItem('confirm')))
},[show])

  return (
    <div className="table_wrapper">
      <SearchFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((x) => (
            <tr {...x.getHeaderGroupProps()}>
              {x.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <span>&or;</span>
                      ) : (
                        <span>&and;</span>
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((x) => {
            // console.log("x", x);
            prepareRow(x);
            return (
              <tr {...x.getRowProps()}>
                {x.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      data-label={cell?.column?.Header}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        {/* show data in per page */}
        <div className="select">
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5,10,15,20].map((x) => (
            <option key={x} value={x}>
              show {x}
            </option>
          ))}
        </select>
        </div>
        <div>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <span>
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                gotoPage(e.target.value ? Number(e.target.value) - 1 : 0);
              }}
            />
            <b>
              {pageIndex + 1}/{pageOptions.length}
            </b>
          </span>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
      {/* book and return button component */}
      <Buttons/>
    </div>
  );
};

export default Table;
