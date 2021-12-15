import React,{useEffect,useState} from 'react'
import {useDispatch} from 'react-redux'
import {confirmData} from '../redux/actions/data'

const ConfirmModal = ({setOpen3}) => {

  const [price,setPrice] = useState()
  const [selectedItem,setSelectedItem] = useState()

//get price from localstorage
  useEffect(()=>{
  setPrice(localStorage.getItem('price'))
  },[price])

  //get selected data from localstorage
  useEffect(()=>{
  setSelectedItem(JSON.parse(localStorage.getItem('selectedObj')))
  },[selectedItem])
  
let dispatch = useDispatch()

const dispatchFn=()=>{
  setOpen3(false)
  dispatch(confirmData(selectedItem))
}
  return (
    <div className="confirm_modal_wrapper">
      <h1>Book a product</h1>
      <div className='confirm_info'>
        <p>your estimated price is ${price}</p>
        <small> Do you want to proceed?</small>
      </div>
      <button onClick={dispatchFn}>confirm</button>
    </div>
  )
}

export default ConfirmModal
