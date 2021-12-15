import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ModalMessage from "./ModalMessage";
const Modal = ({ ...arg }) => {
  const { setOpen, validate } = arg;
  //REDUX_STATE
  const state = useSelector((state) => state.filteredData.data);
  const state2 = useSelector((state) => state.data.data);
  //GENERATE DATA IF FILTERED STATE EMPTY
  const info = state?.length <= 0 ? state2 : state;
  //   DROPDOWN STATE
  const [dropdown, setDropdown] = useState(info?.[0]?.name);
  //DATEPICKER STATE
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState();
  console.log('date',date);
  //CALCULATE DAYS
  const getNumberOfDays = (start, end) => {
    const date1 = new Date(start);
    const date2 = new Date(end);
    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;
    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();
    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);
    setDate(diffInDays);
    return diffInDays;
  };
  useEffect(() => {
    getNumberOfDays(from, to);
  }, [from, to]);
  //MODAL MESSAGE STATE
  const [modalMsg, setModalMsg] = useState(false);
  const ModalMessageOpen = () => {
    setModalMsg(true);
  };
  // LOGIC TO JUSTIFY IF ONE's ABLE TO RENT
  //user can only rent product longer than the minimum rental period
  const product = info?.filter((x) => x.name === dropdown);
  console.log(product);
  const price = product?.[0]?.price;
  const rentalPeriod = product?.[0]?.minimum_rent_period;
  const usedMileage = product?.[0]?.mileage;
  const [discount, SetDiscount] = useState(false);
  useEffect(() => {
    if (rentalPeriod < date) {
      return SetDiscount(true);
    }
    SetDiscount(false);
  }, [rentalPeriod, date]);
  return (
    <div className="modal_wrapper">
      <h3>Book a product</h3>
      <select
        defaultValue={"DEFAULT"}
        onChange={(e) => {
          setDropdown(e.target.value);
        }}
      >
        <option value="DEFAULT" disabled hidden>
          {dropdown}
        </option>{" "}
        {info?.map((x, i) => {
          return (
            <option value={x.name} key={i}>
              {x.name}
            </option>
          );
        })}
      </select>
      <div className="inputField">
        {validate === "return" ? (
          <p>Used Milege: {usedMileage === null ? 0 : usedMileage}</p>
        ) : (
          <>
            <label htmlFor="From">From</label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
            <label htmlFor="To">To</label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </>
        )}
      </div>
      <div className="confirm">
        <span onClick={() => setOpen(false)}>No</span>
        {discount ? (
          <span onClick={ModalMessageOpen}>Yes</span>
        ) : (
          <span
            onClick={() =>
              validate === "return"
                ? setModalMsg(true)
                : alert(
                    `you are not able to rent product maximum days set to ${rentalPeriod}`
                  )
            }
          >
            Yes
          </span>
        )}
      </div>
      {modalMsg && (
        <ModalMessage
          title="Book a product"
          price={price}
          date={date}
          setModalMsg={setModalMsg}
          validate="return"
        />
      )}
    </div>
  );
};

export default Modal;
