import { FilterOutline } from "@ant-design/icons";
import { Input, Mask } from "antd-mobile";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { dealKeyReturnValue } from "../../../../utils";
import ListFilter from "./list-filter";
// import "@/assets/css/todoList.scss";
const TopFilter = (props) => {
  const { t } = useTranslation();
  let [downMenuKey, setDownMenuKey] = useState(t("listPage.fstatus0"));
  let [showSheet, setShowSheet] = useState(false);
  let [value, setValue] = useState("");
  console.log(props);
  const changeListType1 = (item) => {
    setDownMenuKey(item.label);
    props.changeListType(item);
  };
  return (
    <div className="flex filter-nav">
      {props.listKeys?.myDealStatus?.search ? (
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
                props.listKeys.myDealStatus.format,
                "label"
              ).color,
            }}
            onClick={() => setShowSheet((prevState) => !prevState)}
          >
            {downMenuKey}
          </div>
        </div>
      ) : (
        ""
      )}

      <Input
        placeholder="请输入内容"
        value={value}
        onEnterPress={(val) => {
          props.search(val);
        }}
        style={{ marginLeft: "0.4rem" }}
      />
      <div
        className="filter-icon-btn"
        onClick={()=>props.setFilterVisible(true)}
      ></div>
      <Mask
        visible={showSheet}
        onMaskClick={() => setShowSheet(false)}
        style={{ top: "1.2rem" }}
      >
        <div className="handle-nav">
          {props.listKeys?.myDealStatus?.format?.map((item) => (
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
};
export default TopFilter;
