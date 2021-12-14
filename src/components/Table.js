// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getData } from "../redux/actions/data";
// import Modal from "./Modal";

// const Table = () => {
//   //INITIALIZE_DISPATCH
//   const dispatch = useDispatch();
//   //REDUX_STATE
//   const state = useSelector((state) => state.filteredData.data);
//   const state2 = useSelector((state) => state.data.data);
//   console.log(state2);
//   //DISPATCHING ACTION
//   useEffect(() => {
//     dispatch(getData());
//   }, [dispatch]);

//   //GENERATE DATA IF FILTERED STATE EMPTY
//   const info = state?.length <= 0 ? state2 : state;

//   // MODALfn
//   const [open, setOpen] = useState(false);
//   const [open2, setOpen2] = useState(false);
//   const openModal = () => {
//     setOpen(true);
//   };
//   const openModal2 = () => {
//     setOpen2(true);
//   };
//   return (
//     <div className="table_wrapper">

//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Code</th>
//             <th>Availability</th>
//             <th>Need to Repair</th>
//             <th>Durability</th>
//             <th>Mileage</th>
//           </tr>
//         </thead>
//         <tbody>
//           {info?.map((x, i) => {
//             const {
//               name,
//               availability,
//               code,
//               durability,
//               mileage,
//               needing_repair,
//             } = x;
//             return (
//               <tr key={i}>
//                 <td data-label="Name">{name}</td>
//                 <td data-label="Code">{code}</td>
//                 <td data-label="Availability">{availability ? "true" : "false"}</td>
//                 <td data-label="Need To Repair">{needing_repair ? "true" : "false"}</td>
//                 <td data-label="Durability">{durability}</td>
//                 <td data-label="Mileage">{mileage ? mileage : "null"}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <div className="btn_container">
//         <button className="btn1" onClick={openModal}>
//           Book
//         </button>
//         {open && <Modal setOpen={setOpen} validate="book" />}
//         <button className="btn2" onClick={openModal2}>
//           Return
//         </button>
//         {open2 && <Modal setOpen={setOpen2} validate="return" />}
//       </div>
//     </div>
//   );
// };

// export default Table;

import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { COLUMNS } from "./Column";
import SearchFilter from "./SearchFilter";

import { getData } from "../redux/actions/data";
import Modal from "./Modal";

const Table = () => {
  //INITIALIZE_DISPATCH
  const dispatch = useDispatch();
  //REDUX_STATE
  const state2 = useSelector((state) => state.data.data);
  console.log(state2);
  //DISPATCHING ACTION
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  //GENERATE DATA IF FILTERED STATE EMPTY
  // const info = state?.length <= 0 ? state2 : state;

  // MODALfn
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const openModal2 = () => {
    setOpen2(true);
  };

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => state2, [state2]);
  //creating table instance
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  //Destructuring properties and methods from tableInstance
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
    pageCount,
    setPageSize,
    setGlobalFilter,
  } = tableInstance;
  const { pageIndex, pageSize } = state;
  const { globalFilter } = state;

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
            console.log("x", x);
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
      <div>
        {/* show data in per page */}
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
        <span>
          showing page <b>{pageIndex + 1}</b> of {pageOptions.length}
        </span>
        <div>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            <i class="fas fa-chevron-left"></i>
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
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
      <div className="btn_container">
        <button className="btn1" onClick={openModal}>
          Book
        </button>
        {open && <Modal setOpen={setOpen} validate="book" />}
        <button className="btn2" onClick={openModal2}>
          Return
        </button>
        {open2 && <Modal setOpen={setOpen2} validate="return" />}
      </div>
    </div>
  );
};

export default Table;
