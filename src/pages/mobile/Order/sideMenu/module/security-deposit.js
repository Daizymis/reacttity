// ============================保证金============================
// 1、发起人查看

// 流程进度 + 客户侧基础信息 +
// 特批情况说明 + 流程观察者 + 临时流程参与者 + 流程共享人 + 附件 + 发表评论 + 修改记录 + 历史记录 + 驳回原因

// 2、媒介+业务负责人+出纳+特批+财务+会计+观察者

// 流程进度 + 客户侧基础信息 + 媒体侧基础信息 +
// 特批情况说明 + 流程观察者 + 临时流程参与者 + 流程共享人 + 附件 + 发表评论 + 修改记录 + 历史记录 + 驳回原因
import { publicMenu } from '../publicMenu';
const securityDeposit = {
  '8': {
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
      ...publicMenu
    ]
  }
};
export default securityDeposit;
