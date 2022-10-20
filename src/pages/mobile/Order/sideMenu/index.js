import instantRecharge from './module/instant-recharge';
import policyModifyUnderwrite from './module/policy-modify-underwrite';
import backRebate from './module/back-rebate';
import serviceFee from './module/service-fee';
import securityDeposit from './module/security-deposit';
import specialApprovedOrder from './module/special-approved-order';
export const sideMenu = {
  // 即充即返
  ...instantRecharge,
  // 后返返点
  ...backRebate,
  // 政策修改核销
  ...policyModifyUnderwrite,
  // 服务费
  ...serviceFee,
  // 保证金
  ...securityDeposit,
  // 特批下单
  ...specialApprovedOrder
};
export default sideMenu;
