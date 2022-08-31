import React, { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar";
import { useParams } from "react-router";
import { InfiniteScroll, List } from "antd-mobile";
import { http } from "@/utils/index";
import listTableInfo from "../../../listTable/mibile/listData";
import "@/assets/css/todoList.scss";
import { useTranslation } from "react-i18next";
import { dealKeyReturnValue, dealKeyReturnValue1 } from "@/utils/index";
import { throttle } from "../../../utils/util";
import TopFilter from "./child/top-filter";
import ListItem from "./child/list-item";
function TodoList(props) {
  let { type } = useParams();
  type = "ProjectApproval";
  const [listData, setListData] = useState([]);
  let [hasMore, setHasMore] = useState(true);
  const { t } = useTranslation();
  const [total, setTotal] = useState(0);
  let [listKeys, setListKeys] = useState(null);

  let [listParams, setListParams] = useState({
    ordername: "",
    orderby: "",
    pageindex: 1,
    pagesize: 20,
  });

  const reset = () => {};
  useEffect(() => {
    setListKeys(listTableInfo["Order"]);
  }, []);
  const getTodoList = async () => {
    let obj = {
      ...listParams,
    };

    let url = listKeys.type
      ? `/api/getProcessingList/${listKeys.type}`
      : `${listKeys.listdataurl}`;
    const res = await http.post(url, obj);
    setTotal(res.data.total);
    if (listParams.pageindex === 1) {
      setListData(res?.data?.dataList);
      setHasMore(res?.data?.dataList?.length < res.data.total);
    } else {
      setListData((prevState) => [...prevState, ...res?.data?.dataList]);
      setHasMore(res?.data?.dataList?.length + 20 < res.data.total);
    }
    setListParams((prevState) => {
      return { ...prevState, pageindex: listParams.pageindex + 1 };
    });
  };
  async function loadMore() {
    // setHasMore(false);
    if ((listData.length < total || listParams.pageindex === 1) && listKeys) {
      await getTodoList();
    }
  }
  return (
    <div>
      <TopFilter listKeys={listKeys}></TopFilter>
      {/* <List> */}
      <div className="list">
        {listData?.map((item, index) => (
          // <List.Item >
          <div className="list-item" key={index}>
            <div className="list-item-top">
              {listKeys.flowType ? (
                <div className="status">{t("listPage.status")}</div>
              ) : (
                ""
              )}
              {listKeys.flowType ? (
                <div
                  className="status"
                  style={{
                    color: dealKeyReturnValue(
                      item.status,
                      listKeys.flowType.format,
                      "value"
                    )?.color,
                  }}
                >
                  {
                    dealKeyReturnValue(
                      item.status,
                      listKeys?.flowType?.format,
                      "value"
                    ).label
                  }
                </div>
              ) : (
                ""
              )}
            </div>
            <img
              src={require("../../../assets/img/mobile/dashed-line.png")}
              alt=""
              className="dashed-line"
            />
            <ListItem listKeys={listKeys} item={item}></ListItem>
          </div>
          // </List.Item>
        ))}
      </div>
      {/* </List> */}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  );
}
export default TodoList;
