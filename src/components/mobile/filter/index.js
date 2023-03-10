import React, { useEffect, useState } from "react";
import { Button, Input, PickerView, Popup } from "antd-mobile";
import propTypes from "prop-types";
import "./index.scss";

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
  const [showOptions, setShowOptions] = useState([]);
  const [value, setValue] = useState([]);
  const onChange = (val) => {};
  const handlePick = (val) => {
    setValue(val);
  };
  const renderShowData = (item) => {
    return label === "item" ? item : item[label];
  };
  const searchValue = () => {
    if (remote) {
      props.search(searchText);
    } else if (filterable) {
      this.onFilter();
    }
  };
  const onFilter = () => {
    if (searchText ?? "" === "") {
      setShowOptions(options.slice(0));
    } else {
      setShowOptions(
        options.filter((item) => renderShowData(item).indexOf(searchText) > -1)
      );
    }
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

  useEffect(() => {
    console.log(options);
    setShowOptions(options);
  }, [options]);

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
        <PickerView
          columns={showOptions}
          defaultValue={value}
          cols={1}
          onChange={(val) => handlePick(val)}
          renderLabel={(item) => renderShowData(item)}
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
};
Filter.defaultProps = {
  filterable: false,
  remote: false,
  showPicker: true,
  defaultValue: null,
};
