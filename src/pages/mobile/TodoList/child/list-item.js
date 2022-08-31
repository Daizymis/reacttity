import {dealKeyReturnValue, dealKeyReturnValue1} from '@/utils/index'
/**
 * 针对select的值的匹配显示
 * @param keyName
 * @param key
 * @param list
 * @param checkKey
 * @returns {string|*|string}
 */
function showValue(keyName, key, list, checkKey) {
  if (key !== "" && key !== " ") {
    // if (
    //   keyName === 'reorderstatus' &&
    //   (this.listDataAdapt.postData.flowType === 67 ||
    //     this.listDataAdapt.postData.flowType === 62 ||
    //     this.listDataAdapt.postData.flowType === 57)
    // ) {
    //   return dealKeyReturnValue(String(key), list, checkKey).label || '-';
    // }
    return (
      dealKeyReturnValue(key, list, checkKey).label ||
      dealKeyReturnValue1(key, list, checkKey).label ||
      "-"
    );
  }
  return "-";
}
const ListItem = (props) => {
  const { listKeys, item } = props;

  const res = listKeys?.listItem?.map((lItem, lIndex) => {
    let el = <div className="fields-value">{item[lItem.key] || "-"}</div>;
    if (lItem.type === "select" || lItem.type === "pick") {
      el = (
        <div className="fields-value">
          {showValue(lItem.key, item[lItem.key], lItem.format, "value")}
        </div>
      );
    } else if (lItem.type === "date") {
      el = (
        <div className="fields-value">
          {showTime(item[lItem.key], lItem.showFormat)}
        </div>
      );
    }
    return (
      <div className="fields" key={lIndex}>
        <div className="fields-label">{lItem.label}</div>
        {el}
      </div>
    );
  });
  return <div className="list-item-content">{res}</div>;
};

export default ListItem;
