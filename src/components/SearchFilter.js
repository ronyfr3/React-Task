import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterData } from "../redux/actions/data";

const SearchFilter = () => {
  const [search, setSearch] = useState("");
  const state = useSelector((state) => state.data.data);
  const data = state
    ?.filter((x) => {
      if (search === "") {
        return x;
      } else if (x.name.toLowerCase().includes(search.toLowerCase())) {
        return x;
      }
      return 0;
    })
    .map((x) => x);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(filterData(data));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="type here..."
          value={search}
          onChange={handleChange}
        />
        <button>search</button>
      </form>
    </div>
  );
};

export default SearchFilter;
