import React from "react";

const ListGroup = props => {
  const { itemList, onItemSelect, id, name, selectedItem } = props;
  return (
    <ul className="list-group">
      {itemList.map(item => (
        <li
          key={item[id]} // use [], to reuse the ListGroup compones with other kind of lists as well.
          onClick={() => onItemSelect(item)}
          className={
            selectedItem === item
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action"
          }
        >
          {item[name]}
        </li>
      ))}
    </ul>
  );
};

//Default props - no need to pass these in every components if its same as default.
ListGroup.defaultProps = {
  id: "_id",
  name: "name"
};

export default ListGroup;
