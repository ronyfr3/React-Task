import React from "react";

const ModalMessage = ({ ...info }) => {
  const { setModalMsg, price, title, date, validate } = info;
  console.log(validate);
  return (
    <div className="modalmsg_wrapper">
      <h3>{title}</h3>
      <div className="details">
        {validate === "return" ? (
          <p>Your total price is {price}</p>
        ) : (
          <p>Your total price is {price * date}</p>
        )}

        <p>Do you want to procedure?</p>
      </div>
      <div className="confirm">
        <span onClick={() => setModalMsg(false)}>No</span>
        <span onClick={() => setModalMsg(false)}>Yes</span>
      </div>
    </div>
  );
};

export default ModalMessage;
