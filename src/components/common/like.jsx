import React, { Component } from "react";

const Like = ({ like, onClick }) => {
  return (
    <i className={like ? "fas fa-heart" : "far fa-heart"} onClick={onClick} />
  );
};

export default Like;
