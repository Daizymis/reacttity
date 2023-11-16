import React, {useState} from "react";
import {PickerView, Popup, Button, Input} from "antd-mobile";

function InvoiceDetail() {

    const [value, setValue] = useState(['Mon', 'am'])
    const [basicColumns, setBasicColumns] = useState([
        [
            { label: 'we', value: 'foo' },
            { label: '<div key={2}>world</div>', value: 'bar' },
        ]
    ])
    const [visible1, setVisible1] = useState(true)
    const renderShowData = (item) => item.value
    return <>
        <Button
            onClick={() => {
                setVisible1(true)
            }}
        >
            底部弹出
        </Button>
        <Picker visible1={visible1} value={value} setValue={setValue} setVisible1={setVisible1} basicColumns={basicColumns}
                filterable={true}
        ></Picker>

    </>
}

function Picker(props){

    const {value, setValue, basicColumns, visible1, setVisible1,renderShowData,  placeholder,
        filterable,
        remote,searchValue} = props
    const [searchText, setSearchText] = useState("");
    console.log('-------------',basicColumns)
    const onConfirm = () => {
        if (value) {
            let currentChoose = searchValue === "item" ? value : value[searchValue];
            props.onShow(value);
            props.confirm(currentChoose);
            setSearchText("");
        }
        setVisible1(false);
    };
    return <>
        <Popup
            visible={visible1}
            onMaskClick={() => {
                setVisible1(false)
            }}
            onClose={() => {
                setVisible1(false)
            }}
            bodyStyle={{ height: '40vh' }}
        >
            <div className="flex-side">
                <Button
                    color="primary"
                    fill="none"
                    onClick={() => setVisible1(false)}
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
                columns={basicColumns}
                value={value}
                cols={1}
                onChange={(val, extend) => {
                    setValue(val)
                    console.log('onChange', val, extend.items)
                }}
            />
        </Popup>

    </>
}
export default InvoiceDetail;
