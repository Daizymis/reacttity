import React, { Component } from "react";
import propTypes from "prop-types";
export default class NavBar extends Component {
  propTypes = {
    title: propTypes.string,
    back: propTypes.string,
  };
  render() {
    const { title, back } = this.props;
    return (
      <div>
        {back && <span>{back}</span>}
        {title}
      </div>
    );
  }
}
