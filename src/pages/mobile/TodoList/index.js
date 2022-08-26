import React, { Component, useEffect, useState } from "react";
import BetterScroll from "better-scroll";
import NavBar from "../../../components/NavBar";
import { useParams } from "react-router";
import { InfiniteScroll, List } from "antd-mobile";
import { http } from "@/utils/index";
import { ConsoleSqlOutlined } from "@ant-design/icons";
function TodoList(props) {
  const params = useParams();
  const type = "ProjectApproval";
  const [listData, setListData] = useState([]);
  let [hasMore, setHasMore] = useState(false);
  let pageSize = 20;
  let pageIndex = 0;
  let total = 0;
  useEffect(() => {
    getTodoList();
  }, []);
  const getTodoList = async () => {
    const res = await http.post(`/${type}/list`);
    if (res.data?.length > 0) {
      setHasMore(true);
    }
    setListData(res.data);
  };
  async function loadMore() {
    console.log("load more");
    pageIndex++;

    const append = await http.post(`/${type}/list`);
    total = append.total;
    console.log(total);
    setListData((val) => [...listData, ...append.data]);
    setHasMore(listData.length < total);
  }
  return (
    <div>
      <NavBar title="这个" back="返回"></NavBar>
      <List>
        {listData.map((item, index) => (
          <List.Item key={index}>hello world</List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  );
}
export default TodoList;
