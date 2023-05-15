import propTypes from "prop-types";
import { _none } from "../../../utils/util";
import "./index.scss";
const ModifyRecord = ({ records }) => {
  const operateType = {
    add: "增加",
    delete: "删除",
    update: "修改",
  };
  const renderUpdateRecord = (itemL) => {
    if (itemL.type === "UniversalProjectApprovalBudget") {
      return <span>更新了 成本预算</span>;
    } else if (itemL.type === "UniversalProjectApprovalIncome") {
      return <span>更新了 项目收入</span>;
    } else if (!itemL.before && !itemL.after) {
      return <span className="font-color">{itemL.modifyKey}</span>;
    } else {
      return (
        <div>
          将<span className="font-color">{itemL.modifyKey}</span>由
          <span className="font-color">{_none(itemL.before)}</span>
          改为
          <span className="font-color">{_none(itemL.after)}</span>
        </div>
      );
    }
  };
  const renderAddRecord = (itemL) => {
    return (
      <template>
        {!itemL.modifyList &&
          itemL.type !== "SalesOtherContract" &&
          itemL.type !== "CostContract" && (
            <div className="flex-row flex-wrap mt10">
              {itemL.type === "orderseq" ||
                (itemL.type === "billingDetails" && <p>增加了一条数据</p>)}
              {itemL.type === "SalesOtherContractUProject" && (
                <p>新增了一个通用立项</p>
              )}
              <p className="font-color">{itemL.modifyKey}</p>
              {itemL.type === "SalesOtherContractUProject" && <p>单号</p>}为
              <p className="font-color">{_none(itemL.after)}</p>
            </div>
          )}
        {itemL.type === "SalesOtherContract" ||
          (itemL.type === "CostContract" && (
            <div className="flex-row flex-wrap mt10">
              <p>增加了一条媒体与媒体采购产品信息</p>
              <div>
                媒体名称为
                <p className="font-color">{itemL.afterMedia}</p>
                媒体采购产品名称为
                <p className="font-color">{itemL.afterProductType}</p>
              </div>
            </div>
          ))}
        {!!itemL.modifyList && itemL.modifyList.length > 0 && (
          <div className="flex-column flex-wrap mt10">
            {() => {
              switch (itemL.type) {
                case "UniversalProjectApprovalBudget":
                  return <p>增加了 成本预算</p>;
                case "UniversalProjectApprovalIncome":
                  return <p>增加了 项目收入</p>;
                case "StatementStampDetail":
                  return <p>增加了一条结算单</p>;
                default:
                  return <p>增加了一条数据</p>;
              }
            }}
            {itemL.modifyList.map((subItem, subIndex) => (
              <div key={subIndex} className="flex-row">
                <p className="font-color">{subItem.modifyKey}</p>为
                <p className="font-color">{_none(subItem.after)}</p>
              </div>
            ))}
          </div>
        )}
      </template>
    );
  };
  return (
    <div className="log">
      <p className="log-title font-PF-medium">{`修改记录（${records.length}）`}</p>
      {records.map((item) => (
        <div key={item.auditid} className="log-detail">
          <div className="flex-row">
            <p>
              {item.modify.modifyEmpid} {item.modify.modifyName}
            </p>
            <p className="time">{item.modify.modifyDate}</p>
          </div>
          <div className="log-detail-info">
            {item.modifykeys[0].type === "childData" && (
              <p>{operateType[item.modifykeys[0].operation]}了一条数据</p>
            )}
            {item.modifykeys.map((itemL, index) => (
              <div key={index}>
                {itemL.operation === "add" && renderAddRecord(itemL)}
                {itemL.operation === "delete" && (
                  <>
                    {!itemL.modifyList &&
                      itemL.type !== "SalesOtherContract" &&
                      itemL.type !== "CostContract" && (
                        <div className="flex-row flex-wrap mt10">
                          {itemL.type === "orderseq" ||
                            (itemL.type === "billingDetails" && (
                              <p>删除了一条数据</p>
                            ))}
                          {itemL.type === "SalesOtherContractUProject" && (
                            <p>删除了一个通用立项</p>
                          )}
                          <p className="font-color">{itemL.modifyKey}</p>
                          {itemL.type === "SalesOtherContractUProject" && (
                            <p>单号</p>
                          )}
                          为<p className="font-color">{_none(itemL.before)}</p>
                        </div>
                      )}
                    {!!itemL.modifyList && itemL.modifyList.length > 0 && (
                      <div className="flex-column flex-wrap mt10">
                        {() => {
                          switch (itemL.type) {
                            case "UniversalProjectApprovalBudget":
                              return <p>删除了 成本预算</p>;
                            case "UniversalProjectApprovalIncome":
                              return <p>删除了 项目收入</p>;
                            case "StatementStampDetail":
                              return <p>删除了一条结算单</p>;
                            default:
                              return <p>删除了一条数据</p>;
                          }
                        }}
                        {itemL.modifyList.map((subItem, subIndex) => (
                          <div key={subIndex} className="flex-row">
                            <p className="font-color">{subItem.modifyKey}</p>为
                            <p className="font-color">
                              {_none(subItem.before)}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    {itemL.type === "SalesOtherContract" ||
                      (itemL.type === "CostContract" && (
                        <div className="flex-row flex-wrap mt10">
                          <p>删除了一条媒体与媒体采购产品信息</p>
                          <div>
                            媒体名称为
                            <p className="font-color">{itemL.beforeMedia}</p>
                            媒体采购产品名称为
                            <p className="font-color">
                              {itemL.beforeProductType}
                            </p>
                          </div>
                        </div>
                      ))}
                  </>
                )}
                {itemL.operation === "update" &&
                  !!itemL.modifyList &&
                  itemL.modifyList.length > 0 && (
                    <>
                      {itemL.type === "StatementStampDetail" ? (
                        <p>修改了一条结算单</p>
                      ) : (
                        <p>修改了一条数据</p>
                      )}
                      {itemL.modifyList.map((subItem, subIndex) => (
                        <div key={subIndex} className="flex-row flex-wrap mt10">
                          将<p className="font-color">{subItem.modifyKey}</p>由
                          <p className="font-color">{_none(subItem.before)}</p>
                          改为
                          <p className="font-color">{_none(subItem.after)}</p>
                        </div>
                      ))}
                    </>
                  )}
                {itemL.type !== "SalesOtherContract" &&
                  itemL.type !== "CostContract" &&
                  itemL.type !== "SalesOtherContractUProject" && (
                    <div data="update" className="flex-row flex-wrap mt10">
                      {renderUpdateRecord(itemL)}
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

ModifyRecord.prototype = {
  records: propTypes.array,
};
ModifyRecord.defaultProps = {
  records: [],
};
export default ModifyRecord;
