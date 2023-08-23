import {PickerView} from "antd-mobile";
import React from "react";
import propTypes from "prop-types";

const Select = (props) => {
    const {showOptions, value, setValue} = props;
    return <PickerView
        columns={showOptions}
        value={value}
        onChange={val => {
            setValue(val)
        }}
    />
}

Select.propTypes = {
    showOptions: propTypes.array,//选择器列表数据
    value: propTypes.oneOfType([
        propTypes.string,
        propTypes.number,
        propTypes.object, //指定为多种类型的一种
    ]),
    setValue: propTypes.func,
};
Select.defaultProps = {
    showOptions: [],
};
export default React.memo(Select);
