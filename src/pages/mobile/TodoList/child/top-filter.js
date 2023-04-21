import { Input, Mask } from "antd-mobile";
import { memo, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { dealKeyReturnValue } from "../../../../utils";
import ListFilter from "./filter-dialog";
// import "@/assets/css/todoList.scss";
const TopFilter = memo(({changeListType, listKeys, search, setFilterVisible}) => {
  const { t } = useTranslation();
  let [downMenuKey, setDownMenuKey] = useState(t("listPage.fstatus0"));
  let [showSheet, setShowSheet] = useState(false);
  /**
   * 修改流程进度类型，更新列表，清空筛选参数
   * @param item
   */
  const changeListType1 = (item) => {
    setDownMenuKey(item.label);
    changeListType(item);
    reset();
  };
  const inputRef = useRef();
  /**
   * 清空输入框
   */
  const reset = () => {
    inputRef.current.clear();
  };
  return (
    <div className="flex filter-nav">
      {listKeys?.myDealStatus?.search &&
        useMemo(
          () => (
            <div
              className={`handle-select ${
                showSheet ? "handle-select--active" : ""
              } `}
            >
              <div
                className="my-status"
                style={{
                  background: dealKeyReturnValue(
                    downMenuKey,
                    listKeys.myDealStatus.format,
                    "label"
                  ).color,
                }}
                onClick={() => setShowSheet((prevState) => !prevState)}
              >
                {downMenuKey}
              </div>
            </div>
          ),
          [downMenuKey]
        )}

      <Input
        placeholder="请输入内容"
        ref={inputRef}
        onFocus={() => setShowSheet(false)}
        onEnterPress={(e) => {
          e.target && search(e.target.value.trim());
        }}
        style={{ marginLeft: "0.4rem" }}
      />
      <div
        className="filter-icon-btn"
        onClick={() => (setFilterVisible(true), setShowSheet(false))}
      ></div>
      {/*流程进度选择弹框*/}
      <Mask
        visible={showSheet}
        onMaskClick={() => setShowSheet(false)}
        style={{ top: "1.2rem" }}
      >
        <div className="handle-nav">
          {listKeys?.myDealStatus?.format?.map((item) => (
            <div
              key={item.label}
              className={`
                handle-nav-item
                ${item.label === downMenuKey ? "handle-nav-item--active" : ""},
              `}
              style={{ backgroundColor: item.color }}
              onClick={() => {
                changeListType1(item), setShowSheet(false);
              }}
            >
              {t(item.label)}
            </div>
          ))}
        </div>
      </Mask>
    </div>
  );
});
export default TopFilter;
