import React, { useState } from 'react';
import BookModal from "./BookModal";
import ConfirmModal from './ConfirmModal';
import ReturnModal from "./ReturnModal";
import ReturnConfirmModal from './ReturnConfirmModal'

const Buttons = () => {
  // MODAL FUNCTIONALITITES
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  const openModal = () => {
    setOpen(true);
    setOpen3(true);
  };

  const openModal2 = () => {
    setOpen2(true);
    setOpen4(true)
  };

  return (
    <div className="btn_container">
        <button className="btn1" onClick={openModal}>
          Book
        </button>
        {open && <BookModal setOpen={setOpen} setOpen3={setOpen3} />}
        {open ? "":open3 && <ConfirmModal setOpen3={setOpen3}/>}
        <button className="btn2" onClick={openModal2}>
          Return
        </button>
        {open2 && <ReturnModal setOpen2={setOpen2} setOpen4={setOpen4}/>}
        {open2 ? "":open4 && <ReturnConfirmModal setOpen4={setOpen4}/>}
      </div>
  )
}

export default Buttons
