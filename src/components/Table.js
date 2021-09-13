import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../redux/actions/data";

const Table = () => {
  //INITIALIZE_DISPATCH
  const dispatch = useDispatch();
  //REDUX_STATE
  const state = useSelector((state) => state.filteredData.data);
  const state2 = useSelector((state) => state.data.data);
  //DISPATCHING ACTION
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  //GENERATE DATA IF FILTERED STATE EMPTY
  const info = state.length <= 0 ? state2 : state;
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
          {info?.map((x) => {
            const {
              name,
              availability,
              code,
              durability,
              mileage,
              needing_repair,
            } = x;
            return (
              <tr>
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
        <button className="btn1">Book</button>
        <button className="btn2">Return</button>
      </div>
    </div>
  );
};

export default Table;
