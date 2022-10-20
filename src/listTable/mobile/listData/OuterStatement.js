import { flowTypeFormat, myHandlingFormat } from "./enum";
const OuterStatement = {
  typeDesc: "外部结算单",
  type:'75',
  orderName: "updatetime",
  orderBy: "asc",
  searchInfo: {
    fields: ["outerStatementSeq", "innerStatementSeq", "receiptCompanyName"],
    value: "",
  },
  myDealStatus: {
    key: "fstatus",
    format: myHandlingFormat,
    search: true,
  },
  flowType: {
    key: "status",
    format: flowTypeFormat,
    search: true,
  },
  listItem: [
    {
      label: "账期类型",
      key: "periodType",
      type: "select",
      search: true,
      format: [],
      selectData: {
        url: "/api/getDictionary/OuterStatementPeriodType",
        label: "value",
        value: "key",
      },
    },
    {
      label: "结算类型",
      key: "outerStatementType",
      type: "select",
      search: true,
      format: [],
      selectData: {
        url: "/api/getDictionary/OuterStatementType",
        label: "value",
        value: "key",
      },
    },
    {
      label: "客户属性",
      key: "custType",
      type: "select",
      search: true,
      format: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "直属客户",
          label: "直属客户",
        },
        {
          value: "代理商",
          label: "代理商",
        },
      ],
    },
    {
      label: "外部结算单单号",
      key: "outerStatementSeq",
      type: "input",
      search: true,
    },
    {
      label: "对账单号",
      key: "innerStatementSeq",
      type: "input",
      search: true,
      style: "whiteSpace: normal;",
    },
    {
      label: "客户名称",
      key: "custName",
      type: "input",
      search: true,
      notShow: true,
    },
    {
      label: "收款主体",
      key: "receiptCompanyName",
      type: "input",
      search: true,
    },
  ],
};

export default OuterStatement;
