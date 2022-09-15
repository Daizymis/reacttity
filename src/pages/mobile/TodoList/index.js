import React, { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar";
import { useParams } from "react-router";
import { InfiniteScroll, Divider } from "antd-mobile";
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
import { dealObjValue } from "../../../utils";
function TodoList(props) {
  let { type } = useParams();
  type = "ProjectApproval";
  const [data, setData] = useState({
    listData: [],
    hasMore: false,
    total: 0,
    filterParams: {
      searchInfo: {},
    },
    listdataurl: {},
    listParams: {
      ordername: "",
      orderby: "",
      pageindex: 1,
      pagesize: 20,
    },
  });
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [total, setTotal] = useState(0);
  let [listKeys, setListKeys] = useState(() => listTableInfo["Order"]);
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
  useEffect(() => {
    initSelectedData();
    loadMore();
    dealFormatList();
  }, []);
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
    setFilterParams((prevState) => ({
      ...prevState,
      searchInfo: Object.assign({}, val.searchInfo),
      ...initFilterParam,
    }));
    setListParams((prevState) => ({
      ...prevState,
      ordername: val.orderName,
      orderby: val.orderBy,
    }));
  };
  const dealFormatList = async() =>{
    let listItem = listKeys.listItem;
    for (let i =0; i< listItem.length; i++) {
      let item = listItem[i];
      if (item.selectData) {
        let res = await http.post(item.selectData.url);
           item.format = [
             {
               value: '',
               label: t('listPage.allOption')
             }
           ];
           let formatList = res.data.map(fItem =>( {value: fItem[item.selectData.value], label: fItem[item.selectData.label]}))
           item.format = item.format.concat(formatList);
         }
    }
     setListKeys(prevState => ({...prevState, listItem}));
  };
  const reset = () => {
    initSelectedData();
  };
  /**
   * 列表展示
   */
  const getTodoList = async () => {
    setLoading(true);
    let obj = {
      ...listParams,
      conditions: {
        ...dealObjValue(JSON.parse(JSON.stringify(filterParams))),
      },
    };

    let url = listKeys.type
      ? `/api/${listdataurl}/${listKeys.type}`
      : `${listKeys.listdataurl}`;
    const res = await http.post(url, obj);
    setLoading(false);
    setTotal(res.data.total);
    if (listParams.pageindex === 1) {
      setData((prevState) => ({
        ...prevState,
        listData: res?.data?.dataList,
        hasMore: res?.data?.dataList?.length < res.data.total,
      }));
    } else {
      setData((prevState) => ({
        ...prevState,
        listData: [...prevState.listData, ...res?.data?.dataList],
        hasMore: res?.data?.dataList?.length + 20 < res.data.total,
      }));
    }
    setListParams((prevState) => ({
      ...prevState,
      pageindex: listParams.pageindex + 1,
    }));
  };
  async function loadMore() {
    if (
      (data.listData.length < total || listParams.pageindex === 1) &&
      listKeys
    ) {
      await getTodoList();
    }
  }
  const func = useAsyncCallback(() => {
    loadMore();
  });
  const changeListType = (item) => {
    setListdataurl(item.listdataurl);
    reFilterTable();
  };
  const returnFilterData = (item) => {
    setFilterParams((prevState) => ({ ...prevState, [item.key]: item.value }));
  };
  const reFilterTable = () => {
    setListParams((prevState) => ({ ...prevState, pageindex: 1 }));
    setData((prevState) => ({ ...prevState, listData: [], hasMore: true }));
    func();
  };
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
        {data.listData?.map((item, index) => (
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
      {data.listData?.length > 0 ? (
        <InfiniteScroll loadMore={loadMore} hasMore={data.hasMore} />
      ) : loading ? (
        <Loading></Loading>
      ) : <Divider>暂无数据</Divider>}

      { (
        <ListFilter
          listKeys={listKeys}
          setFilterVisible={setFilterVisible}
          filterVisible={filterVisible}
          returnFilterData={returnFilterData}
          filterParams={filterParams}
          reset={reset}
          reFilterTable={reFilterTable}
        ></ListFilter>
      )}
    </div>
  );
}
export default TodoList;
