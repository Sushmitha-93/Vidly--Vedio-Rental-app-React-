import React, { Component } from "react";
import _ from "lodash";

class TableData extends Component {
  renderCell = (row, col) => {
    if (col.content) {
      return col.content(row);
    } else return _.get(row, col.path);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map(row => (
          <tr key={row._id}>
            {columns.map(col => (
              <td key={row._id + (col.path || col.key)}>
                {this.renderCell(row, col)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableData;
