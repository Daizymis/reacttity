import React, { Component, useEffect, useState } from "react";
import BetterScroll from "better-scroll";
import NavBar from "../../../components/NavBar";
import { useParams } from "react-router";

function TodoList(props) {
  const params = useParams();
  const [listData, setListData] = useState([]);
  useEffect(()=>{
    getTodoList();
  },[])
  const getTodoList =()=>{
    setListData([{}]);
  }
  return <div>
    <NavBar title="这个" back="返回"></NavBar>
  </div>
}
export default TodoList;