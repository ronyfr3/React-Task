import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../redux/actions/data";
import Modal from "./Modal";

const Table = () => {
  //INITIALIZE_DISPATCH
  const dispatch = useDispatch();
  //REDUX_STATE
  const state = useSelector((state) => state.filteredData.data);
  const state2 = useSelector((state) => state.data.data);
  console.log(state2);
  //DISPATCHING ACTION
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  //GENERATE DATA IF FILTERED STATE EMPTY
  const info = state?.length <= 0 ? state2 : state;

  // MODALfn
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const openModal2 = () => {
    setOpen2(true);
  };
  return (
    <div className="table_wrapper">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Availability</th>
            <th>Need to Repair</th>
            <th>Durability</th>
            <th>Mileage</th>
          </tr>
        </thead>
        <tbody>
          {info?.map((x, i) => {
            const {
              name,
              availability,
              code,
              durability,
              mileage,
              needing_repair,
            } = x;
            return (
              <tr key={i}>
                <td>{name}</td>
                <td>{code}</td>
                <td>{availability ? "true" : "false"}</td>
                <td>{needing_repair ? "true" : "false"}</td>
                <td>{durability}</td>
                <td>{mileage ? mileage : "null"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
