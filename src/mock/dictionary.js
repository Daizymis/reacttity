import Mock from "mockjs";

// mock方法,详细的可以看官方文档
const Random = Mock.Random;

export default [
  {
    url: "/api/getDictionary/OuterStatementPeriodType",
    type: "post",
    response: () => {
      return {
        code: 200,
        data: [
          {
            id: 1347,
            mark: "OuterStatementPeriodType",
            key: "0",
            value: "预付客户",
            pid: null,
          },
          {
            id: 1348,
            mark: "OuterStatementPeriodType",
            key: "1",
            value: "账期客户",
            pid: null,
          },
        ],
      };
    },
  },
  {
    url: "/api/getDictionary/OuterStatementType",
    type: "post",
    response: () => {
      return {
        code: 200,
        data: [
          {
            id: 1345,
            mark: "OuterStatementType",
            key: "0",
            value: "充值/服务费结算",
            pid: null,
          },
          {
            id: 1346,
            mark: "OuterStatementType",
            key: "1",
            value: "消耗结算",
            pid: null,
          },
        ],
      };
    },
  },
];
