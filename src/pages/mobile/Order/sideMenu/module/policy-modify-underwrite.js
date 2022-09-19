// ===========================政策修改核销-刊例价============================
// ==========客户核销方式-返货================
// 1、发起人查看

// 流程进度 + 客户侧基础信息 + 充值信息 +
// 特批情况说明 + 撤单原因 + 流程观察者 + 临时流程参与者 + 流程共享人 + 附件 + 发表评论 + 修改记录 + 历史记录 + 驳回原因

// 2、媒介 + 业务负责人 + 出纳 + 财务 + 观察者 + 会计审批

// 流程进度 + 客户侧基础信息 + 媒体侧基础信息 + 充值信息 + 媒体付款信息 +
// 特批情况说明 + 撤单原因 + 流程观察者 + 临时流程参与者 + 流程共享人 + 附件 + 发表评论 + 修改记录 + 历史记录 + 驳回原因

// ==========客户核销方式-返现/客户补款================
// 发起人+业务负责人+出纳+财务+会计+观察者

// 流程进度 + 客户侧基础信息 +
// 特批情况说明 + 撤单原因 + 流程观察者 + 临时流程参与者 + 流程共享人 + 附件 + 发表评论 + 修改记录 + 历史记录 + 驳回原因

// ============================政策修改核销-非刊例价=========================
// ==========客户核销方式-返货================
// 1、发起人查看
// 流程进度 + 客户侧基础信息 + 充值信息 +
// 特批情况说明 + 撤单原因 + 流程观察者 + 临时流程参与者 + 流程共享人 + 附件 + 发表评论 + 修改记录 + 历史记录 + 驳回原因
// 2、媒介 + 业务负责人 + 出纳 + 财务 + 观察者 + 会计审批
// 流程进度 + 客户侧基础信息 + 媒体侧基础信息 + 充值信息 + 媒体付款信息 +
// 特批情况说明 + 撤单原因 + 流程观察者 + 临时流程参与者 + 流程共享人 + 附件 + 发表评论 + 修改记录 + 历史记录 + 驳回原因
// ==========客户核销方式-返现/客户补款================
// 流程进度 + 客户侧基础信息 +
// 特批情况说明 + 撤单原因 + 流程观察者 + 临时流程参与者 + 流程共享人 + 附件 + 发表评论 + 修改记录 + 历史记录 + 驳回原因
import { publicMenu } from 'pages/mobile/order/sideMenu/publicMenu';

const usualMenu = {
  RETURN_GOODS: {
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
        key: 'mediaPayInfo',
        label: '媒体付款信息'
      },
      ...publicMenu
    ]
  },
  OTHER: {
    starter: [
      {
        key: 'process',
        label: '流程进度'
      },
      {
        key: 'cusBaseInfo',
        label: '客户侧基础信息'
      },
      ...publicMenu
    ],
    media: [],
    other: [
      {
        key: 'process',
        label: '流程进度'
      },
      {
        key: 'cusBaseInfo',
        label: '客户侧基础信息'
      },
      ...publicMenu
    ]
  }
};
const policyModifyUnderwrite = {
  '5': usualMenu,
  '6': usualMenu
};
export default policyModifyUnderwrite;
