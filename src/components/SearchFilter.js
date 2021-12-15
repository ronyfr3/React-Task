import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

const SearchFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((x) => {
    setFilter(x || undefined);
  });
  return (
    <div className="search-wrapper">
      <h1>Rental</h1>
      <form>
        <input
          type="text"
          placeholder="Search"
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default SearchFilter;
