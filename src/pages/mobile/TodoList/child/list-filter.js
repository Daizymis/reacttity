import { Popup, SearchBar } from "antd-mobile";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import "@/assets/css/listFilter.scss";
const ListFilter = (props) => {
  const { filterVisible, setFilterVisible, listKeys } = props;
  const { t } = useTranslation();
  const [timeSelected, setTimeSelected] = useState();
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
  const [checkedValue, setCheckedValue] = useState({});
  const selectValue = (item, key, type) => {
    //筛选条件选择逻辑
    if (type === "date") {
      setTimeSelected({ [key]: item.label });
      if (timeSelect(item.label) === "自定义") {
        customKey = key;
        return;
      }
      props.returnFilterData({
        key: key,
        value: timeSelect(item.value),
      });
      console.log(timeSelect(item.value));
    } else {
      props.returnFilterData({
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
      showTimer = true;
      return "自定义";
    } else {
      return "";
    }
  };
  const openPick = () => {};
  return (
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
        maxHeight: "78%",
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
                        ? active
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
              {item.search ? (
                <div>
                  <p className="title">{item.label}</p>
                  <div v-if="item.type === 'input'" className="search-dev">
                    <SearchBar
                      value={checkedValue[item.key]}
                      placeholder="请输入内容"
                      onClick={openPick(item)}
                    />
                  </div>
                </div>
              ) : item.type === "pick" ? (
                <div className="search-dev">
                  <SearchBar
                    value={returnPickerVal(item)}
                    placeholder="请输入内容"
                    onClick={openPick(item)}
                  />
                </div>
              ) : (
                <div className="item-list">
                  {item.format?.map((vItem, vIndex) => (
                    <div
                      key={vIndex}
                      className={{
                        active:
                          checkedValue[item.key] === vItem.value ||
                          (item.type === "date" &&
                            timeSelected[item.key] === vItem.label),
                      }}
                      onClick={() => selectValue(vItem, item.key, item.type)}
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
              )}
            </div>
          ))}
        </div>
        <div className="filter-btn">
          <div onClick={() => props.reset()}>重置</div>
          <div onClick={() => props.getData()}>确定</div>
        </div>
      </div>
    </Popup>
  );
};

export default ListFilter;
