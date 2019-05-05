import React, { Component } from "react";

// coloumns : array
// sort: object
// onSort: function
class TableHeader extends Component {
  raiseSort = column => {
    console.log(column);
    const sort = { ...this.props.sort };
    sort.column = column;
    if (this.props.sort.column === column)
      sort.order = this.props.sort.order === "asc" ? "desc" : "asc";
    else sort.order = "asc";

    this.props.onSort(sort);
  };

  renderSortIcon = column => {
    const { sort } = this.props;

    if (column.path !== sort.column) return null;
    if (sort.order === "asc") return <i className="fas fa-sort-up" />;
    return <i className="fas fa-sort-down" />;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(col => (
            <th
              className="clickable"
              key={col.path || col.key}
              onClick={() => this.raiseSort(col.path)}
            >
              {col.label} {this.renderSortIcon(col)}
            </th> //observe col.path and "{"col.label"}""
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
