import { Popup } from "antd-mobile";
const ListFilter = (props) => {
  const { visible, setVisible } = props;
  return (
    <>
      <Popup
        visible={visible}
        showCloseButton
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          minHeight: "40vh",
        }}
      >
        <div className="filter-content">
          {listKeys.flowType && listKeys.flowType.search ? (
            <div className="filter-item">
              <p class="title">{t("listPage.status")}</p>
              <div class="item-list">
                {flowTypeSelect.map(vItem, (vIndex) => (
                  <div
                    key={vIndex}
                    className="{ {active: vItem.value === checkedValue[listKeys.flowType.key] }}"
                    onCclick={selectValue(vItem, listKeys.flowType.key)}
                  >
                    {vItem.label}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
          {listKeys.listItem.map((item, index) => {
            <div key={index} className="filter-item">
              {item.search ? (
                <div>
                  <p class="title">{item.label}</p>
                  <div v-if="item.type === 'input'" class="search-dev">
                    <SearchBar
                      value={checkedValue[item.key]}
                      placeholder="请输入内容"
                      onClick={openPick(item)}
                    />
                  </div>
                </div>
              ) : item.type === "pick" ? (
                <div class="search-dev">
                  <SearchBar
                    value={returnPickerVal(item)}
                    placeholder="请输入内容"
                    onClick={openPick(item)}
                  />
                </div>
              ) : (
                <div className="item-list">
                  {item.format.map((vItem, vIndex) => (
                    <div
                      key={vIndex}
                      className={{
                        active:
                          checkedValue[item.key] === vItem.value ||
                          (item.type === "date" &&
                            timeSelected[item.key] === vItem.label),
                      }}
                      onClick="selectValue(vItem, item.key, item.type)"
                    >
                      {vItem.label}
                    </div>
                  ))}

                  {timeSelected[item.key] === "自定义" &&
                  checkedValue[item.key] ? (
                    <p class="customTime">
                      {checkedValue[item.key][0] +
                        " ~ " +
                        checkedValue[item.key][1]}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>;
          })}
        </div>
        <div class="filter-btn">
          <div onClick={() =>props.reset()}>重置</div>
          <div onClick={() =>props.getData()}>确定</div>
        </div>
      </Popup>
    </>
  );
};

export default ListFilter;
