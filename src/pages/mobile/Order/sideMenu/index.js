import instantRecharge from 'pages/mobile/order/sideMenu/module/instant-recharge';
import policyModifyUnderwrite from 'pages/mobile/order/sideMenu/module/policy-modify-underwrite';
import backRebate from 'pages/mobile/order/sideMenu/module/back-rebate';
import serviceFee from 'pages/mobile/order/sideMenu/module/service-fee';
import securityDeposit from 'pages/mobile/order/sideMenu/module/security-deposit';
import specialApprovedOrder from 'pages/mobile/order/sideMenu/module/special-approved-order';
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
