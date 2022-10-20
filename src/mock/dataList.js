import Mock from "mockjs";

// mock方法,详细的可以看官方文档
const Random = Mock.Random;

export default [
  {
    url: RegExp("api/getmenus"+".*"),
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
              type:'Contract',
              imgUrl: "",
              name: "合同",
              route: 'todolist/ProjectApproval'
            },
            {
              id: 2,
              flowType: 2,
              muduleName: "立项",
              type:'ProjectApproval',
              imgUrl: "",
              name: "立项",
              route: 'todolist/ProjectApproval'
            },
            {
              id: 3,
              flowType: 3,
              muduleName: "开票",
              type:'Invoice',
              imgUrl: "",
              name: "开票",
              route: 'todolist/ProjectApproval'
            },
            {
              id: 4,
              flowType: 4,
              muduleName: "结算单",
              type:'Statement',
              imgUrl: "",
              name: "结算单",
              route: 'todolist/OuterStatement'
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
