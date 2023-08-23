import Mock from "mockjs";

// mock方法,详细的可以看官方文档
const Random = Mock.Random;

export default [
  {
    url: "/api/loginCheck",
    type: "post",
    response: (config) => {
      let request = JSON.parse(config.body);
      if (request.username === "guest" && request.password === "guest") {
        return {
          code: 201,
          token: "youaretheappleinmyeyes",
          userInfo:
            {id:1,caid:1,"empid":"1","deptid":"1","name":"guest","leadercaid":544,"leadername":"mary"},
        };
      }
      return {
        code: 300,
        data: { msg: "用户名或密码不正确" },
      };
    },
  },
  {
    url: "/user/file",
    type: "get",
    response: () => {
      let fileList = [];
      for (let i = 0; i < 6; i++) {
        let file = {};
        file.uid = Random.id();
        file.name = Random.title(3, 5);
        file.url = Random.image("200x100", "#50B347", "#FFF", Random.title(1));
        fileList.push(file);
      }
      return {
        code: 200,
        data: {
          fileList,
        },
      };
    },
  },
  {
    url: '/user/permissions',
    type: "post",
    response: () =>{
      const permissions = [
        "Entrance::CustPayment",
        "Entrance:RegisterForm",
        "Entrance:CustomerSettings",
        "Entrance:SystemSet",
        "Entrance:TicketReview",
        "Entrance:ProjectApproval",
        "Entrance:Order",
        "Entrance:SalesContractReview",
        "Entrance:SalesOtherContract",
        "Entrance:CostContract",
        "Entrance:CSOrder",
        "Entrance:UniversalProjectApproval",
        "Entrance:Pusher",
        "Entrance:DataShare",
        "Entrance:BackOrder",
        "Entrance:CIMSPurchaseOrder",
        "Entrance:SupplierInvoice",
        "Entrance:BizsOpportunity",
        "Entrance:CustomerAccount",
        "Entrance:CIMSAfterPurchaseOrder",
        "Entrance:BatchReOrder",
        "Entrance:Statement",
        "Entrance:StatementStamp",
        "Entrance:OuterStatement",
        "Entrance:BackPayment",
        "Entrance:SaleOrder",
      ];
      return {
        code: 200,
        data: {
          permissions
        }
      }
    }
  }
];
