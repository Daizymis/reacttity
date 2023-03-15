import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Button, Input, PickerView, Popup } from "antd-mobile";
import propTypes from "prop-types";
import "./index.scss";
import Select from "./select";

export default function Filter(props) {
  const {
    placeholder,
    filterable,
    remote,
    label,
    remoteMethod,
    searchLabel,
    showPicker = true,
    setShowPicker,
    options,
  } = props;
  const [searchText, setSearchText] = useState("");
  // const [showOptions, setShowOptions] = useState([]);
  const [value, setValue] = useState('');
  const onChange = (val) => {};
  const handlePick = (val, extend) => {
    setValue(Object.assign(value, extend.items));
  };
  const renderShowData = (item) => {
    return label === "item" ? <span key={item}>item</span> : item[label];
  };
  console.log('重新渲染了');
  const showOptions = useMemo(()=>{
    console.log(options);
    if (searchText ?? "" === "") {
      return [options.slice(0)];
    } else {
    return [options.filter((item) => renderShowData(item).indexOf(searchText) > -1)]
    }
  },[options, searchText])
  const searchValue = () => {
    if (remote) {
      props.search(searchText);
    } else if (filterable) {
      this.onFilter();
    }
  };
  const onFilter = () => {
    // if (searchText ?? "" === "") {
    //   setShowOptions(options.slice(0));
    // } else {
    //   setShowOptions(
    //     options.filter((item) => renderShowData(item).indexOf(searchText) > -1)
    //   );
    // }
    //回调父组件的函数
    props.onFilter(showOptions);
  };
  const onConfirm = () => {
    if (value) {
      let currentChoose = searchValue === "item" ? value : value[searchValue];
      props.onShow(value);
      props.confirm(currentChoose);
      setSearchText("");
    }
    setShowPicker(false);
  };

  // useEffect(() => {
  //   console.log(options);
  //   setShowOptions([options]);
  // }, [options]);
  const basicColumns = [
    [
      { label: "周一", value: "Mon" },
      { label: "周二", value: "Tues" },
      { label: "周三", value: "Wed" },
      { label: "周四", value: "Thur" },
      { label: "周五", value: "Fri" }
    ]
  ];
  return (
    <>
      <Popup
        visible={showPicker}
        position="bottom"
        bodyStyle={{ width: "100vw", height: "50vw" }}
      >
        <div className="flex-side">
          <Button
            color="primary"
            fill="none"
            onClick={() => setShowPicker(false)}
          >
            取消
          </Button>
          <Button color="primary" fill="none" onClick={() => onConfirm()}>
            确定
          </Button>
        </div>
        {(remote || filterable) && (
          <Input
            placeholder={placeholder}
            value={searchText}
            onChange={(val) => searchValue(val)}
          />
        )}
        {/* {useMemo(
          () => (
            <PickerView
              columns={basicColumns}
              value={value}
              // cols={1}
              onChange={(val, extend) => {setValue(val); console.log("onChange", val, extend.items);}}
              renderLabel={item => item.label}
            />
          ),
          [showOptions]
        )} */}
        <Select
            showOptions={showOptions}
            setValue={setValue}
            value={value}
            renderShowData={renderShowData}
      />
      </Popup>
    </>
  );
}
Filter.propTypes = {
  options: propTypes.array,
  filterable: propTypes.bool,
  remote: propTypes.bool,
  showPicker: propTypes.bool,
  defaultValue: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
    propTypes.object, //指定为多种类型的一种
  ]),
  label: propTypes.string,
};
Filter.defaultProps = {
  filterable: false,
  remote: false,
  showPicker: true,
  defaultValue: null,
  label: "value",
};
