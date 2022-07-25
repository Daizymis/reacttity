import React, { Component } from "react";
import BetterScroll from "better-scroll";
import NavBar from "../../../components/NavBar";

export default class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
    };
  }
  render() {
    return (
      <div>
        <button onClick={this.getData}>click</button>
        <NavBar title="这个" back="返回"></NavBar>
        <div
          className="wrapper"
          style={{ height: "200px", overflow: "hidden", background: "pink" }}
        >
          <ul className="content">
            {this.state.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  getData = () => {
    let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.setState(
      {
        list,
      },
      () => {
        // document.querySelector("wrapper");
        new BetterScroll(".wrapper");
      }
    );
  };
}
