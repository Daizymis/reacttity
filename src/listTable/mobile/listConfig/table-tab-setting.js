import i18n from "../../../locales";
import {
  getLaterProcessingList,
  getMyProcessList,
  getNeedAttentionList,
  getProcessedList,
  getProcessingList,
  getRetractedList,
} from "@/utils/config";

export const tabTitleSetting = [
  {
    value: 0,
    color: "#FA8C16",
    // title: '未处理',
    title: i18n.t("listPage.fstatus0"),
    listdataurl: getProcessingList,
    orderNameSelf: "createtime",
  },
  {
    value: 0,
    color: "#ff976a",
    // title: '稍后处理',
    title: i18n.t("listPage.marked"),
    listdataurl: getLaterProcessingList,
    isMarked: true,
    orderNameSelf: "createtime",
  },
  {
    value: 4,
    color: "#1890FF",
    // title: '需关注',
    title: i18n.t("listPage.fstatus4"),
    listdataurl: getNeedAttentionList,
  },
  {
    value: 1,
    color: "#52C41A",
    // title: '已处理',
    title: i18n.t("listPage.fstatus1"),
    listdataurl: getProcessedList,
  },
  {
    value: 2,
    color: "#13C2C2",
    // title: '我发起的',
    title: i18n.t("listPage.fstatus2"),
    listdataurl: getMyProcessList,
  },
  {
    value: 3,
    color: "#FF4D4F",
    // title: '发起人已撤回',
    title: i18n.t("listPage.fstatus3"),
    listdataurl: getRetractedList,
  },
  {
    value: 100,
    color: "",
    // title: '全部',
    title: i18n.t("listPage.allOption"),
    listdataurl: "getTodoList",
    orderNameSelf: "fstatus",
  },
];
// 没有稍后处理
export const tabTitleSetting2 = tabTitleSetting.filter(
  (item) => item.listdataurl !== getLaterProcessingList
);
// 业务请款
export const tabTitleSettingOfRequstFunds = [
  {
    key: 0,
    value: 0,
    lvalue: "<i class='yfont_red'>未处理</i>",
    title: i18n.t("listPage.fstatus0"),
    listdataurl: getProcessingList,
    orderNameSelf: "createtime",
  },
  {
    value: 7,
    color: "#FA8C16",
    // title: '稍后处理',
    title: i18n.t("listPage.marked"),
    listdataurl: getLaterProcessingList,
    orderNameSelf: "createtime",
  },
  {
    value: 4,
    lvalue: "<i class='yfont_blue'>需关注</i>",
    title: i18n.t("listPage.fstatus4"),
    listdataurl: getNeedAttentionList,
  },
  {
    value: 1,
    lvalue: "<i class='yfont_green'>已处理</i>",
    title: i18n.t("listPage.fstatus1"),
    listdataurl: getProcessedList,
  },
  {
    value: 2,
    lvalue: "<i class='yfont_blue'>我发起的</i>",
    title: i18n.t("listPage.fstatus2"),
    listdataurl: getMyProcessList,
  },
  {
    value: 6,
    lvalue: "<i class='yfont_red'>发起人已撤回</i>",
    title: i18n.t("listPage.fstatus3"),
    listdataurl: getRetractedList,
  },
  {
    value: 100, //前端定义
    color: "",
    // title: '全部',
    title: i18n.t("listPage.allOption"),
    listdataurl: "getTodoList",
    orderNameSelf: "fstatus",
  },
];
