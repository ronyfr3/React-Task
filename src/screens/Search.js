import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

const Search = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((x) => {
    setFilter(x || undefined);
  });
  return (
      <div>
        <label htmlFor='search'>Search</label>
        <input
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
        />
      </div>
  );
};
export default Search;
