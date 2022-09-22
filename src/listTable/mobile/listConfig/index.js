import { tabTitleSetting } from "./table-tab-setting";

export default {
    Order: {
      name: "下单",
      permissions: {
        viewDataModeKey: "View:Order:DataMode",
        hasCreatNew: "Flow:Order",
      },
      listdata: [
        {
          url: "dataAdapt",
          postData: {
            title: "审批流模式",
            type: "Order",
            flowType: 57,
            isShow: true,
            url: "getWorkFlowDetail",
            createRoute: "Order",
            listdataurl: "getTodoList",
            keys: ["flowtype", "processinstanceid"],
          },
          module: "Order",
          tabList: tabTitleSetting,
        },
        {
          url: "dataAdapt",
          postData: {
            title: "台账模式",
            type: "Order1",
            flowType: 57,
            isShow: "viewDataModeKey",
            url: "getWorkFlowDetail",
            createRoute: "Order",
            listdataurl: "getMyTodoList",
            keys: ["flowtype", "processinstanceid"],
          },
          module: "Order",
        },
      ],
    },
  };
  