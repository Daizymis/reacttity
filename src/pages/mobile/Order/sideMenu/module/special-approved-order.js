// ============================特批下单============================
// 1、发起人查看

// 流程进度 + 客户侧基础信息 + 充值信息 + 客户付款信息 +
// 特批情况说明 + 撤单原因 + 流程观察者 + 临时流程参与者 + 流程共享人 + 附件 + 发表评论 + 修改记录 + 历史记录 + 驳回原因

// 2、媒介审批

// 流程进度 + 客户侧基础信息 + 媒体侧基础信息 + 充值信息 + 媒体付款信息 +
// 特批情况说明 + 撤单原因 + 流程观察者 + 临时流程参与者 + 流程共享人 + 附件 + 发表评论 + 修改记录 + 历史记录 + 驳回原因

// 3、特批+出纳+会计+财务+观察者审批

// 流程进度 + 客户侧基础信息 + 媒体侧基础信息 + 充值信息 + 客户付款信息 +
// 媒体付款信息 +
// 特批情况说明 + 撤单原因 + 流程观察者 + 临时流程参与者 + 流程共享人 + 附件 + 发表评论 + 修改记录 + 历史记录 + 驳回原因
import { publicMenu } from 'pages/mobile/order/sideMenu/publicMenu';
const specialApprovedOrder = {
  '9': {
    starter: [
      {
        key: 'process',
        label: '流程进度'
      },
      {
        key: 'cusBaseInfo',
        label: '客户侧基础信息'
      },
      {
        key: 'rechargeInfo',
        label: '充值信息'
      },
      {
        key: 'cusPayInfo',
        label: '客户付款信息'
      },
      ...publicMenu
    ],
    media: [
      {
        key: 'process',
        label: '流程进度'
      },
      {
        key: 'cusBaseInfo',
        label: '客户侧基础信息'
      },
      {
        key: 'mediaBaseInfo',
        label: '媒体侧基础信息'
      },
      {
        key: 'rechargeInfo',
        label: '充值信息'
      },
      {
        key: 'mediaPayInfo',
        label: '媒体付款信息'
      },
      ...publicMenu
    ],
    other: [
      {
        key: 'process',
        label: '流程进度'
      },
      {
        key: 'cusBaseInfo',
        label: '客户侧基础信息'
      },
      {
        key: 'mediaBaseInfo',
        label: '媒体侧基础信息'
      },
      {
        key: 'rechargeInfo',
        label: '充值信息'
      },
      {
        key: 'cusPayInfo',
        label: '客户付款信息'
      },
      {
        key: 'mediaPayInfo',
        label: '媒体付款信息'
      },
      ...publicMenu
    ]
  }
};
export default specialApprovedOrder;
