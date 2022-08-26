import React, { Component } from "react";
import propTypes from "prop-types";
function NavBar(props) {
  const { title, back } = props;
  return (
    <div>
      {back && <span>{back}</span>}
      {title}
    </div>
  );
}
export default NavBar;
