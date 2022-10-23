import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { InfiniteScroll, Divider } from "antd-mobile";
import { http } from "@/utils/index";
import listTableInfo from "../../../listTable/mobile/listData";
import "@/assets/css/todoList.scss";
import { useTranslation } from "react-i18next";
import { dealKeyReturnValue } from "@/utils/index";
import { connect } from "react-redux";
import TopFilter from "./child/top-filter";
import ListItem from "./child/list-item";
import { useMemo } from "react";
import FilterDialog from "./child/filter-dialog";
import Loading from "../Loading";
import useAsyncCallback from "../../../hook/useAsynState";
import { dealObjValue } from "../../../utils";
import { setDataAdapt, setListDataAdapt } from "../../../store/action";
import listConfig from "../../../listTable/mobile/listConfig";
function TodoList(props) {
  let { listDataAdapt, setListDataAdapt, dataAdapt, setDataAdapt } = props;
  const listFilter = useRef();
  let { type } = useParams();
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
  let [listKeys, setListKeys] = useState(() => listTableInfo[type]);
  const listTypes = useMemo(() => listConfig[type]);
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
    // listFilter.current.reset();
  };
  const dealFormatList = async () => {
    let listItem = listKeys.listItem;
    for (let i = 0; i < listItem.length; i++) {
      let item = listItem[i];
      if (item.selectData) {
        let res = await http.post(item.selectData.url);
        item.format = [
          {
            value: "",
            label: t("listPage.allOption"),
          },
        ];
        let formatList = res.data.map((fItem) => ({
          value: fItem[item.selectData.value],
          label: fItem[item.selectData.label],
        }));
        item.format = item.format.concat(formatList);
      }
    }
    setListKeys((prevState) => ({ ...prevState, listItem }));
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
    // const type = listTypes.listdata.filter(config => {
    //   return item.value === config.value;
    // });
    // setListDataAdapt(type[0])
    initSelectedData();
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
  const search = (val) => {
    console.log("------------------------");
    console.log(val);
    setFilterParams((prevState) => ({
      ...prevState,
      searchInfo: Object.assign({}, prevState.searchInfo, { value: val }),
    }));
    reFilterTable();
    func();
  };
  const navigate = useNavigate();
  /**
   * go to detail view
   * @param {*} item
   */
  const goToDetails = (item) => {
    let _postData = {};
    listDataAdapt?.postData?.keys?.forEach((val) => {
      _postData[val] = item[val];
    });
    const timestamp = new Date().getTime();
    setDataAdapt({
      url: listDataAdapt.postData.url,
      postData: _postData,
      timestamp: timestamp,
    });
    navigate(`/${item.SystemCoreRoute}?timestamp=${timestamp}`, {
      timestamp: timestamp,
    });
  };
  return (
    <div>
      {useMemo(() => {
        return (
          <TopFilter
            ref={listFilter}
            listKeys={listKeys}
            changeListType={changeListType}
            setFilterVisible={setFilterVisible}
            search={search}
          ></TopFilter>
        );
      }, [listKeys])}

      <div className="list">
        {data.listData?.map((item, index) => (
          <div
            className="list-item"
            key={index}
            onClick={() => goToDetails(item)}
          >
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
      ) : (
        <Divider>暂无数据</Divider>
      )}

      {
        <FilterDialog
          listKeys={listKeys}
          setFilterVisible={setFilterVisible}
          filterVisible={filterVisible}
          returnFilterData={returnFilterData}
          filterParams={filterParams}
          reset={reset}
          reFilterTable={reFilterTable}
        ></FilterDialog>
      }
    </div>
  );
}
const mapStateToProps = (state) => {
  return { listDataAdapt: state.listDataAdapt, dataAdapt: state.dataAdapt };
};
export default connect(mapStateToProps, { setListDataAdapt, setDataAdapt })(
  TodoList
);
