import React,{useState,useEffect} from 'react'
import { useSelector } from "react-redux";

const BookModal = ({...arg}) => {
  const {setOpen,setOpen3} = arg

  const all_data = useSelector((state) => state.data.data);

  const [mileage,setMileage] = useState(0)
  const [durability,setDurability] = useState()
  
  const [dropdown,setDropdown] = useState(all_data[0]?.name)
  const selectedData = all_data?.find((x) => x.name === dropdown);

 //DATEPICKER STATE
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState();

  // console.log('date',isNaN(date))
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
    //save date
    setDate(diffInDays);
    return diffInDays;
  };
  useEffect(() => {
    getNumberOfDays(from, to);
  }, [from, to]);

const setFromDate=(e)=>{
  setFrom(e.target.value)
}
const setToDate=(e)=>{
 setTo(e.target.value)
}
 //CHECK THE VALIDITY OF BOOK A PRODUCT
 let validity
 if(date>=selectedData?.minimum_rent_period){
   validity=true
 }else{
   validity=false
 }

  //calculate initial mileage
  const prev_mileage = all_data.find((item)=>item.name===dropdown)
  // console.log(prev_mileage);

  useEffect(()=>{
    prev_mileage.type==="meter" && setMileage(prev_mileage.mileage)
  },[setMileage,prev_mileage])

  //durability calculate
  const durabilityCheck = all_data.find((item)=>item.name===dropdown)
  useEffect(()=>{
    durabilityCheck.type==="meter" && setDurability(durabilityCheck.durability-date*2)
    durabilityCheck.type==="plain" && setDurability(durabilityCheck.durability-date*1)
  },[setDurability,durabilityCheck,date])

//calculate estimate price
// console.log(isNaN(date)===false?date:1);
let estimate_price = date*selectedData?.price
// console.log(estimate_price);

let returningMileage = mileage+date*10;
const selectedObj = {
  selectedData,
  mileage,
  returningMileage,
  durability
}
//combinefunction for handling two modal close/open functionality
const combineFunction=()=>{
  setOpen(false)
  setTimeout(() => {
    localStorage.setItem("price",estimate_price)
    localStorage.setItem("selectedObj",JSON.stringify(selectedObj))
  }, 1000);
}
const closeModal=()=>{
  setOpen3(false)
  setOpen(false)
}
  return (
    <div className="BookModal_wrapper">
     <h1>Book a product</h1>
     <select
        defaultValue={"DEFAULT"}
        onChange={(e) => {
          setDropdown(e.target.value);
        }}
      >
        <option value="DEFAULT" disabled hidden>
          {dropdown}
        </option>{" "}
        {all_data?.map((x, i) => {
          return (
            <option value={x.name} key={i}>
              {x.name}
            </option>
          );
        })}
      </select>
      <div className="selectedItem_details">
      <p>Name: {selectedData?.name}</p>
      <p>Rental: {selectedData?.minimum_rent_period}</p>
      <p>Milleage: {selectedData?.mileage===null?"N/A":selectedData?.mileage}</p>
      <p>Repair Needed: {selectedData?.needing_repair===false?"false":"true"}</p>
      </div>
      <div className='dates'>
      <label htmlFor="From">From {""}</label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFromDate(e)}
            />
            <label htmlFor="To">To {""}</label>
            <input
              type="date"
              value={to}
              onChange={(e) => setToDate(e)}
            />
      </div>
      {/* error msg if not validate compare to minimum rental days */}
      <span className="err_msg">
        {
      isNaN(date)===false ? validity===true?"":`The rental period needs to be at least ${selectedData?.minimum_rent_period} day`:""
      }
      </span> 
      <div className="exit_buttons">
        <button className={isNaN(date)===true || validity===false ?"not_validate":"yes_btn"} onClick={combineFunction} disabled={ isNaN(date)===true || validity===false}>Yes</button>
        <button className='no_btn' onClick={closeModal}>No</button>
      </div>
    </div>
  )
}

export default BookModal
