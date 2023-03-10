import React, {useState} from "react";
import {Input, PickerView} from "antd-mobile";

function filter(props) {
    const {value, setValue, placeholder, filterable, remote, remoteMethod, searchLabel} = props;
    const [options, setOptions] = useState([]);
    const onChange = (val) =>{}
    const handlePick = ()=>{}
    const renderShowData = () => {
        return this.label || (this.isObject ? '' : this.value);
    }
    return <>
    <Input
        placeholder={placeholder}
        value={value}
        onChange={val => onChange(val)}
    />
    <PickerView columns={options} defaultValue={defaultValue} onChange={(val)=>handlePick(val)} renderLabel={(item) => renderShowData(item)}/>
    </>
}
