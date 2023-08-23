import React, {memo, useCallback, useEffect, useMemo, useState} from "react";
import {Button, SearchBar, PickerView, Popup} from "antd-mobile";
import propTypes from "prop-types";
import "./index.scss";
import Select from "./select";


function Filter(props) {
    const {
        placeholder,
        filterable,
        remote,
        defaultValue,
        showPicker = true,
        setShowPicker,
    } = props;
    const [searchText, setSearchText] = useState("");
    const [value, setValue] = useState([]);

    useEffect(() => {
        setValue([defaultValue]);
    }, [defaultValue]);
    /**
     * 根据是否可过滤来获取下拉列表
     * 依据为输入框是否有值
     */
    const showOptions = useMemo(() => {
        if (!searchText) {
            return [props.children.slice(0)];
        } else if (filterable && !remote) {
            return [props.children.filter((item) => item.label.indexOf(searchText) > -1)] || []
        }
    }, [props.children, searchText])
    /**
     * 当输入框值发生改变时，判断是远程搜索，还是内部过滤
     */
    const searchValue = (val) => {
        setSearchText(val)
        if (remote) {
            props.search(val);
        }
    };
    /**
     * 提交值：选了数据才触发事件，否则仅关闭弹出层
     */
    const onConfirm = () => {
        if (value) {
            props.confirm(value[0]);
            setSearchText("");
        }
        setShowPicker(false);
    };
    return (
        <>
            <Popup
                visible={showPicker}
                position="bottom"
                bodyStyle={{width: "100vw", height: "50vw"}}
            >
                <div className="flex-side">
                    <Button
                        color="primary"
                        fill="none"
                        onClick={() => setShowPicker(false)}
                        style={{
                            '--text-color': '#969799'
                        }}
                    >
                        取消
                    </Button>
                    <Button color="primary" fill="none" onClick={() => onConfirm()}
                            style={{
                                '--text-color': '#969799'
                            }}>
                        确定
                    </Button>
                </div>
                {(remote || filterable) && (
                    <SearchBar
                        placeholder={placeholder}
                        value={searchText}
                        onChange={(val) => searchValue(val)}
                        className="filter-input"
                        clearable
                    />
                )}
                <Select
                    showOptions={showOptions}
                    setValue={setValue}
                    value={value}
                ></Select>
            </Popup>
        </>
    );
}

Filter.propTypes = {
    filterable: propTypes.bool,//数据过滤标识
    remote: propTypes.bool, //远程搜索标识，默认为false
    search: propTypes.func, //远程搜索事件函数
    showPicker: propTypes.bool, //弹窗展示
    defaultValue: propTypes.oneOfType([
        propTypes.string,
        propTypes.number,
        propTypes.object, //指定为多种类型的一种
    ])
};
Filter.defaultProps = {
    filterable: false,
    remote: false,
    showPicker: true,
    defaultValue: null
};
export default React.memo(Filter);
