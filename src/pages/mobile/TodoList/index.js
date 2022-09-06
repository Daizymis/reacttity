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
import { useMemo } from "react";
import ListFilter from "./child/list-filter";
import Loading from "../Loading";
import useAsyncCallback from "../../../hook/useAsynState";
function TodoList(props) {
  let { type } = useParams();
  type = "ProjectApproval";
  const [listData, setListData] = useState([]);
  let [hasMore, setHasMore] = useState(true);
  const { t } = useTranslation();
  const [total, setTotal] = useState(0);
  let [listKeys, setListKeys] = useState(() => {
    return listTableInfo["Order"];
  });
  let [filterParams, setFilterParams] = useState({
    searchInfo: {},
  });
  let [listdataurl, setListdataurl] = useState("getProcessingList");

  let [listParams, setListParams] = useState({
    ordername: "",
    orderby: "",
    pageindex: 1,
    pagesize: 20,
  });
  useEffect(()=>{
    initSelectedData();
    loadMore();
  }, [])
  let [filterVisible, setFilterVisible] = useState(false);
  
  const initSelectedData = (params) => {
    const val = params ? params : listKeys;
    // 筛选重置
    //处理过滤参数默认值
    setFilterParams({});
    if (val.flowType && val.flowType.search) {
      setFilterParams((prevState) => {
        return { ...prevState, [val?.flowType?.key]: "" };
      });
    }
    let initFilterParam = {};
    val.listItem.forEach((item) => {
      if (item.search) {
        initFilterParam[item.key] = "";
      }
    });
    setFilterParams((prevState) => {
      return { ...prevState, searchInfo: Object.assign({}, val.searchInfo), ...initFilterParam, };
    });
    setListParams((prevState) => {
      return {
        ...prevState,
        ordername: val.orderName,
        orderby: val.orderBy,
      };
    });
  };
  const reset = () => {
    initSelectedData();
  };
  /**
   * 列表展示
   */
  const getTodoList = async () => {
    let obj = {
      ...listParams,
    };

    let url = listKeys.type
      ? `/api/${listdataurl}/${listKeys.type}`
      : `${listKeys.listdataurl}`;
    const res = await http.post(url, obj);
    console.log(res);
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
  const func = useAsyncCallback(()=>{
    loadMore();
  })
  const changeListType = (item) => {
    console.log(item);
    setListdataurl(item.listdataurl);
    setListParams((prevState) => {
      return { ...prevState, pageindex: 1 };
    });
    setListData([]);
    setHasMore(true);
    func();
  };
  const returnFilterData = (item) => {
    console.log(item);
    setFilterParams(prevState=>{return {...prevState, [item.key]: item.value}});
  };
  const resetTable = () =>{
    setListData([]);
    setListParams(prevState => {return {...prevState,pageindex :1}} )
  }
  return (
    <div>
      {useMemo(() => {
        return (
          <TopFilter
            listKeys={listKeys}
            changeListType={changeListType}
            setFilterVisible={setFilterVisible}
          ></TopFilter>
        );
      }, [listKeys])}

      <div className="list">
        {listData?.map((item, index) => (
          <div className="list-item" key={index}>
            <div className="list-item-top">
              {listKeys.flowType && (
                <div className="status">{t("listPage.status")}</div>
              )}
              {listKeys.flowType && (
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
              )}
            </div>
            <img
              src={require("../../../assets/img/mobile/dashed-line.png")}
              alt=""
              className="dashed-line"
            />
            <ListItem listKeys={listKeys} item={item} />
          </div>
        ))}
      </div>
      {listData?.length > 0 ? <InfiniteScroll loadMore={loadMore} hasMore={hasMore} /> : <Loading></Loading>}

      {filterVisible && (
        <ListFilter
          listKeys={listKeys}
          setFilterVisible={setFilterVisible}
          filterVisible={filterVisible}
          returnFilterData={returnFilterData}
          filterParams={filterParams}
          reset ={reset}
        ></ListFilter>
      )}
    </div>
  );
}
export default TodoList;
