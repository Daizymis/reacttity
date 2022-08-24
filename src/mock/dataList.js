import Mock from "mockjs";

// mock方法,详细的可以看官方文档
const Random = Mock.Random;

export default [
  {
    url: "/menus",
    type: "get",
    response: (config) => {
      const menuList = [
        {
          id:1,
          menuTypeName: "菜单1",
          menuList: [
            {
              id: 1,
              flowType: 1,
              muduleName: "合同",
              imgUrl: "",
            },
            {
              id: 2,
              flowType: 2,
              muduleName: "立项",
              imgUrl: "",
            },
            {
              id: 3,
              flowType: 3,
              muduleName: "开票",
              imgUrl: "",
            },
            {
              id: 4,
              flowType: 4,
              muduleName: "结算单",
              imgUrl: "",
            },
          ],
        },
      ];
      return {
        code: 200,
        data: menuList,
      };
    },
  },
];
