import React,{useState} from 'react'

const ReturnModal = ({setOpen2,setOpen4}) => {
  const [data,setData] = useState([])
  const [mileage,setMileage] = useState("")
  const [dropdown,setDropdown] = useState("Air Compressor 12 GAS")
  const selectedData = data?.data?.find((x) => x.name === dropdown);
  
  React.useMemo(()=>{
    setData(JSON.parse(localStorage.getItem("returnProduct")))
  },[setData])


  React.useMemo(()=>{
    localStorage.setItem("returnPrice",selectedData?.price)
  },[selectedData])

  const closeModal=()=>{
    setOpen4(false)
    setOpen2(false)
  }

  return (
    <div>
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
        {data?.data?.map((x, i) => {
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
      <div className='mileageCount'>
          <input
            type="number"
            name="mileage"
            value={mileage}
            placeholder="used mileage"
            onChange={(e)=>setMileage(e.target.value)}
          />
      </div>
      <div className="exit_buttons">
        <button className="yes_btn" onClick={()=>setOpen2(false)} disabled={!mileage}>Yes</button>
        <button className='no_btn' onClick={closeModal}>No</button>
      </div>
    </div>
    </div>
  )
}

export default ReturnModal
