import { Popup, SearchBar, Input, Calendar, Button } from "antd-mobile";
import {memo, useCallback, useState} from "react";
import { useTranslation } from "react-i18next";
import "@/assets/css/listFilter.scss";
import moment from "moment";
const ListFilter = memo((props) => {
  const {
    filterVisible,
    setFilterVisible,
    listKeys,
    returnFilterData,
    reFilterTable,
    reset,
    filterParams: checkedValue,
  } = props;
  const { t } = useTranslation();
  const [customizeData, setCustomizeData] = useState({
    showTimer: false,
    customKey: "",
  });
  const [timeSelected, setTimeSelected] = useState({});
  // const [showTimer, setShowTimer] = useState(false);
  const flowTypeSelect = useCallback(() => {
    if (listKeys?.flowType) {
      return [
        {
          value: "",
          label: t("listPage.allOption"),
        },
        ...listKeys.flowType.format,
      ];
    }
    return [];
  }, [listKeys]);
  const selectValue = (item, key, type) => {
    //筛选条件选择逻辑
    if (type === "date") {
      setTimeSelected({ [key]: item.label });
      if (timeSelect(item.label) === "自定义") {
        setCustomizeData((prevState) => ({ ...prevState, customKey: key }));
        return;
      }
      returnFilterData({
        key: key,
        value: timeSelect(item.value),
      });
    } else {
      returnFilterData({
        key: key,
        value: item.value,
      });
    }
  };
  const timeSelect = (value) => {
    //时间筛选值处理
    if (value === "今日") {
      return [new Date().format("yyyy-MM-dd"), new Date().format("yyyy-MM-dd")];
    } else if (value === "昨日") {
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
      return [start.format("yyyy-MM-dd"), start.format("yyyy-MM-dd")];
    } else if (value === "最近7天") {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
      return [start.format("yyyy-MM-dd"), end.format("yyyy-MM-dd")];
    } else if (value === "最近30天") {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 29);
      return [start.format("yyyy-MM-dd"), end.format("yyyy-MM-dd")];
    } else if (value === "自定义") {
      setCustomizeData((prevState) => ({ ...prevState, showTimer: true }));
      // setFilterVisible(false);
      return "自定义";
    } else {
      return "";
    }
  };
  const returnPickerVal = useCallback(item => {
    const obj = item.format.find((res) => {
      return res.value === checkedValue[item.key];
    });
    if (obj) {
      return obj.label;
    }
    return "";
  }, []);
  const openPick = () => {};
  const onConfirmDate = () => {
    setCustomizeData(prevState=> ({...prevState, showTimer: false}))
    const time = customizeData.custTime.map((item) => {
      return moment(item)?.format("yyyy-MM-DD");
    });
    returnFilterData({
      key: customizeData.customKey,
      value: time,
    });
  };
  return (
    <>
      <Popup
        visible={filterVisible}
        showCloseButton
        onMaskClick={() => {
          setFilterVisible(false);
        }}
        onClose={() => {
          setFilterVisible(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      >
        <div className="list-filter">
          <div className="filter-content">
            {listKeys.flowType && listKeys.flowType.search && (
              <div className="filter-item">
                <p className="title">{t("listPage.status")}</p>
                <div className="item-list">
                  {flowTypeSelect()?.map((vItem, vIndex) => (
                    <div
                      key={vIndex}
                      className={`${
                        vItem.value === checkedValue[listKeys.flowType.key]
                          ? "active"
                          : ""
                      }`}
                      onClick={() => selectValue(vItem, listKeys.flowType.key)}
                    >
                      {vItem.label}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {listKeys?.listItem?.map((item, index) => (
              <div key={index} className="filter-item">
                {item.search && (
                  <div>
                    <p className="title">{item.label}</p>
                    {(() => {
                      switch (item.type) {
                        case "input":
                          return (
                            <div className="search-dev">
                              <Input
                                placeholder="请输入内容"
                                value={checkedValue[item.key]}
                                onChange={(val) => {
                                  returnFilterData({
                                    key: item.key,
                                    value: val,
                                  });
                                }}
                              />
                            </div>
                          );
                          break;
                        case "pick":
                          return (
                            <div className="search-dev">
                              <SearchBar
                                value={returnPickerVal(item)}
                                placeholder="请输入内容"
                                onClick={openPick(item)}
                              />
                            </div>
                          );
                          break;
                        default:
                          return (
                            <div className="item-list">
                              {item.format?.map((vItem, vIndex) => (
                                <div
                                  key={vIndex}
                                  className={`${
                                    checkedValue[item.key] === vItem.value ||
                                    (item.type === "date" &&
                                      timeSelected[item.key] === vItem.label)
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    selectValue(vItem, item.key, item.type)
                                  }
                                >
                                  {vItem.label}
                                </div>
                              ))}

                              {timeSelected[item.key] === "自定义" &&
                                checkedValue[item.key] && (
                                  <p className="customTime">
                                    {checkedValue[item.key][0] +
                                      " ~ " +
                                      checkedValue[item.key][1]}
                                  </p>
                                )}
                            </div>
                          );
                      }
                    })()}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="filter-btn">
            <div onClick={() => reset()}>重置</div>
            <div
              onClick={() => (reFilterTable(), setFilterVisible(false))}
            >
              确定
            </div>
          </div>
        </div>
      </Popup>

      <Popup
        visible={customizeData.showTimer}
        onMaskClick={() => {
          setCustomizeData(prevState=> ({...prevState, showTimer: false}))
        }}
        position="bottom"
        bodyStyle={{ height: "77vh" }}
      >
        <Calendar
          defaultValue={customizeData.custTime}
          selectionMode="range"
          min={new Date(2000, 1, 1)}
          max={new Date(2050, 1, 1)}
          onChange={(val) => setCustomizeData((prevState)=> ({...prevState, custTime: val}))}
        />
        <Button block color='primary' size='large' onClick={onConfirmDate} disabled={!customizeData.custTime}>
          确认
        </Button>
      </Popup>
    </>
  );
});
export default ListFilter;
