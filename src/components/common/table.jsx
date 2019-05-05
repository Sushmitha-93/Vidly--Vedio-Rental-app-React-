import React from "react";
import TableHeader from "./tableHeader";
import TableData from "./tableData";

const Table = ({ columns, data, sort, onSort }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sort={sort} onSort={onSort} />

      <TableData data={data} columns={columns} />
    </table>
  );
};

export default Table;
