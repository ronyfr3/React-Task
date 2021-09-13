import React from "react";
import SearchFilter from "./components/SearchFilter";
import Table from "./components/Table";
import "./sass/main.scss";
const App = () => {
  return (
    <div className="app">
      <SearchFilter />
      <Table />
    </div>
  );
};

export default App;
