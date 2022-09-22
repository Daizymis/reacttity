/*
	项目常量
*/
export const LOGIN_OK = 201; //登录成功
export const LOGIN_NO = 301; //登录失败

export const SUBMIT_OK = 200; //提交成功
export const SUBMIT_NO = 300; //提交失败

export const UNAUTHORIZED = 401; //用户信息失效
export const USERINFO_NO = 403; //验证失败

export const myVue = window.myVue;

//下拉框配置
export const commonalitySelectConfig = {
  a: { key: 'v', value: 'name' },
  a1: { key: 'v', value: 'name' },
  a2: { key: 'v', value: 'name' }
};

/*
	项目接口
*/
export let jsonURL = null;
export let baseURL = null;
export let openDetails = null;
export let basePath = null;

switch (process.env.VUE_APP_ENV) {
  case 'production':
    jsonURL = '../../../static/data';
    baseURL = '/biz/api';
    openDetails = '#';
    basePath = 'http://hrtest2.dev.cn2.corp.agrant.cn/materials/hrsystem/';
    break;
  case 'release':
    jsonURL = '../../../static/data';
    baseURL = '/biz/api';
    openDetails = '#';
    basePath = 'https://biz.cue.group/materials/hrsystem/';
    break;
  case 'ybbiz':
    jsonURL = '../../../static/data';
    baseURL = '/biz/api';
    openDetails = '#';
    basePath = 'http://ybbiz.firstoa.cn/materials/hrsystem/';
    break;
  case 'wsbiz':
    jsonURL = '../../../static/data';
    baseURL = '/biz/api';
    openDetails = '#';
    basePath = 'http://wsbiz.firstoa.cn/materials/hrsystem/';
    break;
  case 'xybiz':
    jsonURL = '../../../static/data';
    baseURL = '/biz/api';
    openDetails = '#';
    basePath = 'http://biz.firstoa.cn/materials/hrsystem/';
    break;
  case 'test': //dev
    jsonURL = 'http://hrtest2.dev.cn2.corp.agrant.cn/bizv3/static/data';
    baseURL = '/bizv3/biz/api';
    openDetails = '#';
    basePath = 'http://hrtest2.dev.cn2.corp.agrant.cn/materials/hrsystem/';
    break; //test
  case 'testrelease':
    jsonURL = 'http://hrtest2.dev.cn2.corp.agrant.cn/biztest/static/data';
    baseURL = '/biztest/biz/api';
    openDetails = '#';
    basePath = 'http://hrtest2.dev.cn2.corp.agrant.cn/materials/hrsystem/';
    break;
  case 'beta':
    jsonURL = 'http://hrbeta.dev.cn2.corp.agrant.cn/bizv3/static/data';
    baseURL = '/bizv3/biz/api';
    openDetails = '#';
    basePath = 'http://hrtest2.dev.cn2.corp.agrant.cn/materials/hrsystem/';
    break;
  case 'uat':
    jsonURL = 'http://hrbeta.dev.cn2.corp.agrant.cn/uat/static/data';
    baseURL = '/uat/biz/api';
    openDetails = '#';
    basePath = 'http://hrtest2.dev.cn2.corp.agrant.cn/materials/hrsystem/';
    break;
  case 'cims':
    jsonURL = 'http://esdev2.dev.cn2.corp.agrant.cn/cimsfront/static/data';
    baseURL = 'http://esdev3.dev.cn2.corp.agrant.cn/api';
    openDetails = '#';
    basePath = 'http://hrtest2.dev.cn2.corp.agrant.cn/materials/hrsystem/';
    break;
  default:
    jsonURL = '../../../static/data';
    baseURL = '/api';
    openDetails = 'http://localhost:8080/#';
    basePath = 'http://hrtest2.dev.cn2.corp.agrant.cn/materials/hrsystem/';

    break;
}

//登录接口
export const loginUrl = '/loginCheck';
//退出接口
export const logoutUrl = '/logout';
//首页入口接口
export const entranceUrl = '/getmenus';
//时时刷新代办数目
export const getTodoNums = '/getTodoNums';
//数据适配器接口
export const dataAdaptUrl = '/dataAdapt';
//流程发起初始化接口
export const createWorkFlowUrl = '/createWorkFlow/';
//流程发起提交接口
export const startWorkFlowStartUrl = '/startWorkFlow/';
//存草稿接口
export const saveDraftUrl = '/saveDraft/';
//存草稿更新接口
export const updateDraftUrl = '/updateDraft/';
//计算请假天数
export const getMethodUrl = '/method/';
//处理流程接口
export const approvalWorkFlowUrl = '/approvalWorkFlow/';
//通讯录修改接口
export const updateEmployeeUrl = '/updateEmployee/';
//新建员工接口
export const createEmployee = '/createEmployee/';
//新建员工提交信息接口
export const saveEmployee = '/saveEmployee/';
//上传照片
export const uploadImage = baseURL + '/file/uploadImage/';
//emial
export const emailUrl = '/e/';
//是否登录状态接口
export const knock = '/knock';
//导入接口
export const importCsv = baseURL + '/file/importCsv';
export const importCsv2 = baseURL + '/file/importCsv2';
export const importCsvFinal = baseURL + '/file/importCsvFinal';
//添加附件接口
export const uploadAttachment = baseURL + '/file/uploadAttachment';
//删除附件接口
export const deleteAttachment = '/file/deleteAttachment/';
//下载附件接口
export const down = '/file/down';
//下载附件接口
export const _Export = '/file/export';

//发表评论接口
export const savecomments = '/comments/savecomments';

//添加供应商接口
export const insertSupplier = '/insertSupplier';

//角色权限》获取角色列表
export const getAllRoleUrl = '/getAllRole';
//角色权限》增加角色
export const addRoleUrl = '/addRole/';
//角色权限》删除角色
export const deleteRoleUrl = '/deleteRole/';
//角色权限》获取权限列表
export const getAllAuthUrl = '/getAllAuth';
//角色权限》获取角色下对应的权限
export const getRoleAuthUrl = '/getRoleAuth/';
//角色权限》修改角色名称
export const modifyRoleUrl = '/modifyRole/';
//角色权限》获取修改记录
export const getModifyLogsUrl = '/getModifyLogs';
//角色权限》获取员工信息
export const getEmployeesUrl = '/getEmployees';
//角色权限》通过权限id获取角色
export const getRoleByAuthidUrl = '/getRoleByAuthid/';
//通过用户id获取角色用户拥有的角色id列表
export const getRoleByCaidUrl = '/getRoleByCaid/';
//角色权限》通过角色id获取用户信息
export const getUserByRoleidUrl = '/getUserByRoleid/';
//角色权限》通过角色id添加用户
export const addRoleUserUrl = '/addRoleUser/';
//角色权限》通过角色id增加批量删除用户
export const deleteRoleUserByUserArrUrl = '/deleteRoleUserByUserArr/';

//角色权限》通过角色id修改角色下权限
export const modifyRoleAuthUrl = '/modifyRoleAuth/';
//角色权限》通过用户id批量添加修改角色
export const saveUserRolesUrl = '/saveUserRoles/';
//角色权限》通过权限id增加批量删除用户
export const modifyAuthRoleUrl = '/modifyAuthRole/';
//添加临时观察者
export const addParticipant = '/addParticipant';
//添加临时观察者
export const delParticipant = '/delParticipant/';
//角色权限》修改记录
export const getUserRoleAuthModifyLogs = '/getUserRoleAuthModifyLogs/';

//基础设置》获取公司
export const branchesUrl = '/branches';

//职位类别获取职位列表
export const getTitleUrl = '/getTitle/';

//客户下单
export const createCustomerOrder = '/createCustomerOrder/';
export const saveOrUpdateMediaCustomer = '/saveOrUpdateMediaCustomer/';
export const getAgentCustomersByAgentId = '/getAgentCustomersByAgentId/';
export const saveOrUpdateMediaCustomerDraft = '/saveOrUpdateMediaCustomerDraft/';
export const createMediaOrder = '/createMediaOrder/';

//获取部门
export const deptUrl = '/dept';
//获取职位
export const titleUrl = '/title';
//获取职位状态
export const empStatusUrl = '/empStatus';
// 获取公司更新日志
export const getCompanyModifyLogsUrl = '/getCompanyModifyLogs';
//获取部门更新日志
export const getDeptModifyLogsUrl = '/getDeptModifyLogs';
//获取职位更新日志
export const getTitleModifyLogsUrl = '/getTitleModifyLogs';
//获取职位状态更新日志
export const getStatusModifyLogsUrl = '/getStatusModifyLogs';

//校验code是否重复
export const validateNoNameUrl = '/validateNoName';
//修改信息
export const updateSettingsUrl = '/updateSettings';
//新增保存信息
export const saveSettingsUrl = '/saveSettings';
//删除信息
export const delSettingsUrl = '/delSettings';
//修改领导人名称或者公司地址
export const updateLocateOrManagerUrl = '/updateLocateOrManager';
//获取公司银行信息

//个人中心》修改登陆密码
export const updatePwdUrl = '/updatePwd';
//个人中心》修改联系方式
export const updateEmpContactInfoUrl = '/updateEmpContactInfo';
export const getDeptNameByDeptid = '/getDeptNameByDeptid';

export const getDetailSelect = '/getDetailSelect';
export const saveCustomerDetail = '/saveCustomerDetail';
export const saveCustomerBasic = '/saveCustomerBasic';
export const getCustomerSelect = '/getCustomerSelect';
export const updateCustomerBase = '/updateCustomerBase';
export const updateCustomerDetail = '/updateCustomerDetail';
export const getMediaSelect = '/getMediaSelect';
export const saveSupplier = '/saveSupplier';
export const getSupplierInfo = '/getSupplierInfo';
export const updateSupplier = '/updateSupplier';
export const getRegisterForm = '/getRegisterForm';
export const saveMedia = '/saveMedia';
export const updateMedia = '/updateMedia';
export const getContractReviewSelect = '/getContractReviewSelect';
export const saveContractRegCheck = '/saveContractRegCheck';
export const getContractRegCheckInfo = '/getContractRegCheckInfo';
export const getContractRegReviewParticipant = '/getContractRegReviewParticipant';
export const getContractRegReviewRealAndTemporary = '/getContractRegReviewRealAndTemporary';
export const saveContractReviewAttachemt = '/saveContractReviewAttachemt';
export const getAllComments = '/getAllComments';
export const queryContractReviewModifyRecords = '/queryContractReviewModifyRecords';
export const getTempSelectAndCanUpdate = '/getTempSelectAndCanUpdate';
export const ectAndCanUpdate = '/ectAndCanUpdate';
export const saveTemporaryRole = '/saveTemporaryRole';
export const getContractRegReviewTemporary = '/getContractRegReviewTemporary';
export const delTemporaryContractReviewRole = '/delTemporaryContractReviewRole';
export const selectTodoComment = '/selectTodoComment';
export const updateContractRegCheck = '/updateContractRegCheck';
export const getContractAttachemtByCheckId = '/getContractAttachemtByCheckId';
export const getCommountByParentId = '/getCommountByParentId';
export const startWorkFlow = '/startWorkFlow/';
export const querySupplierModifyRecords = '/querySupplierModifyRecords';
export const saveSupplierDetail = '/saveSupplierDetail';
export const updateSupplierDetail = '/updateSupplierDetail';

export const saveCommercialOpportunity = '/saveCommercialOpportunity';
export const updateCommercialOpportunity = '/updateCommercialOpportunity';

export const getMediaManagerSelect = '/getMediaManagerSelect';
export const setNotReceiveContractReviewEmail = '/setNotReceiveContractReviewEmail';

export const setCostNotReceiveContractReviewEmail = '/cost/setNotReceiveContractReviewEmail';

export const toCostContractReviewList = '/cost/toContractReviewList';

export const toContractReviewList = '/toContractReviewList';
export const getCRMSelect = '/getCRMSelect';
export const delContractRegCheck = '/delContractRegCheck';
export const saveCRMContract = '/saveCRMContract';

//业务系统
//合同登记》获取页面数据
export const contractRegUrl = '/contractReg';
//保存数据
export const saveUrl = '/contractReg/save';
//获取详情数据
export const contractRegInfoUrl = '/contractRegInfo/';
//修改合同信息
export const contractRegUpdateUrl = '/contractReg/update';
//收款登记获取页面数据
export const createRegisterFormUrl = '/createRegisterForm';
//收款登记 》新建页面提交数据
export const saveOrUpdateRegisterFormUrl = '/saveOrUpdateRegisterForm';
//获取关联客户
export const associationPAProjectCRMByProjectId = '/associationPAProjectCRMByProjectId';
//获取银行信息列表
export const accountMsgUrl = '/accountMsg/';
//获取详情页信息
export const updateRegisterPageUrl = '/updateRegisterPage';

export const saveOrUpdateBatchAmountClaimsUrl = '/saveOrUpdateBatchAmountClaims';

export const deleteAmountClaimByIdUrl = '/deleteAmountClaimById';

//业务请款
export const custmediasUrl = '/custmymedias'; ///custmedias

//付款状态
export const DictionaryStatusUrl = '/DictionaryStatus'; //DictionaryStatus
//特批根据客户名称选择负责人
export const getCRMSalesRelationUrl = '/getCRMSalesRelation';

//移动端特批业务请款批量删除
export const batchDeleteUrl = '/workflow/batchDelete/';

export const flowLine6Url = '/flowLine/6';

export const flowLine = '/flowLine/';

export const flowLine18Url = '/flowLine/18';
//业务请款表格导入
export const importCustPaymentOrderDetail = baseURL + '/file/importCustPaymentOrderDetail';
//收款的登记批量导入
export const businessSystemImportUrl = baseURL + '/file/BusinessSystemImport';
export const ticketDetailsImport = baseURL + '/file/ticketDetailsImport';
export const bilingDetailsImport = baseURL + '/file/bilingDetailsImport';
export const TicketReviewImport = baseURL + '/file/TicketReviewImport';
//媒介层级表批量导入
export const MediumRelationImportCheck = baseURL + '/file/MediumRelationImportCheck';
//立项阈值导入
export const PAProfitMarginThresholdImportCheck = baseURL + '/file/PAProfitMarginThresholdImportCheck';
//媒体政策管理批量导入预检
export const mediaPolicyImportPreCheck = baseURL + '/mediaPolicyImportPreCheck';
//业务请款请求开户银行列表
export const getCRMDetailUrl = '/getCRMDetail';
//重置密码
export const resetPassWordUrl = '/resetPassWord/';

//立项
//根据销售发起人获取下拉数据
export const getSelectIntersection = '/getSelectIntersection';
//根据销售发起人好获取客户下拉数据
export const getCustomerIntersection = '/getCustomerIntersection';
//直属客户名称
export const relatedCustomerList = '/relatedCustomerList';
//客户媒体政策
export const getPolicyData = '/getPolicyData';
//媒体政策
export const getMediaPolicyData = '/getMediaPolicyData';
export const getIndustry = '/getIndustry';
//媒体采购产品
export const getProductTypeByMedia = '/getProductTypeByMedia';
//媒体客户行业
export const getIndustryByMedia = '/getIndustryByMedia';
//商机
export const getCommercialOpportunitySelect = 'getCommercialOpportunitySelect';
export const getAgentCustomersContainUnconfirmByAgentId = 'getAgentCustomersContainUnconfirmByAgentId';
//关联通用立项
export const getCanLinkUProjectList = '/getCanLinkUProjectList';
export const getProjectCanLinkUProjectList = '/getProjectCanLinkUProjectList';

//销售合同
//获取立项下拉数据;
export const getProjectApprovalSelect = '/getProjectApprovalSelect';
// 获取选择字段数据
export const getProjectApproval = '/getProjectApproval';
//获取关联主立项单号
export const getSalesContractSelect = '/getSalesContractSelect';
//校验客户侧基本信息
export const validateCustomerPolicy = '/validateCustomerPolicy';
//媒体代理政策
export const getSalesGuideQuoteData = '/getSalesGuideQuoteData';
//媒体供应商
export const getSupplierInfoByMediaId = '/getSupplierInfoByMediaId';
//乙方、收款公司
export const skgetMyBranches = '/skgetMyBranches';

//其他合同
//乙方公司
export const getCutomersByCondition = '/getCutomersByCondition';

//商机管理
//商机状态
export const getDictionary = '/getDictionary';
//商机媒体数据
export const createCommercialOpportunity = '/createCommercialOpportunity';

//商机列表
export const getCommercialOpportunityList = '/getCommercialOpportunityList';
//商机详情
export const getCommercialOpportunityDetail = '/getCommercialOpportunityDetail';
//列表页点终止按钮
export const stopCommercialOpportunity = '/stopCommercialOpportunity';
//修改记录
export const queryCommercialOpportunityRecords = '/queryCommercialOpportunityRecords';

//销售指导报价管理
//列表页
export const getSalesGuideQuoteSelect = '/getSalesGuideQuoteSelect';
//详情页
export const getSalesGuideQuoteInfo = '/getSalesGuideQuoteInfo';
//保存
export const saveSalesGuideQuote = '/saveSalesGuideQuote';
//更新
export const updateSalesGuideQuote = '/updateSalesGuideQuote';
//导入预检
export const salesGuideImportUrl = baseURL + '/salesGuideQuoteImportPreCheck';
export const salesGuideQuoteExport = baseURL + '/salesGuideQuoteExport';
export const salesGuideQuoteImportFailDownload = baseURL + '/salesGuideQuoteImportFailDownload';

//媒体信息管理 > 新增媒体采购产品
export const saveProductType = '/saveProductType';

export const getMediaInfo = '/getMediaInfo';

//新建发票   关联合同
export const getContractByCid = '/getContractByCid';

//业务请款  关联成本合同
export const listCostContractList = '/listCostContractList';

//成本合同
//成本合同--获取媒体列表
export const getMediaBySupplier = '/getMediaBySupplier/';
//关联立项
export const listProjectApprovalList = '/listProjectApprovalList';
//关联通用立项
export const listUniversalProjectApprovalList = '/listUniversalProjectApprovalList';
//成本类别
export const listCostTypeListByUniversalProjectId = '/listCostTypeListByUniversalProjectId';
//媒介
export const getEmployeesByPermission = '/getEmployeesByPermission/Audit:CostContract:Medium';

//发票信息审核
//获取关联发票申请号
export const getTicketNumber = '/getTicketNumber';
//合同终止
export const method = './method';

//通用立项
//客户
export const getCutomersByConditionAll = './getCutomersByConditionAll';
//公司
export const getBranchesUnionByUserArr = './getBranchesUnionByUserArr';
//列表编辑
export const editCheck = './workflow/editCheck/';

//媒体层级表
export const getMediumRelation = './getMediumRelation';
export const updateMediumRelation = './updateMediumRelation';

//系统设置模块修改记录
export const getModifyLogs = '/getModifyLogs';

// 获取售后订单列表
export const listAfterSaleOrderByCustomerAndCompany = '/listAfterSaleOrderByCustomerAndCompany';
// 下单 & 补返单 导入预检
export const BizOrderRechargeImport = baseURL + '/file/BizOrderRechargeImport';
// 获取修改记录
export const getModifyLogList = '/getModifyLogList';

//列表接口
//未处理
export const getProcessingList = 'getProcessingList';
//已处理
export const getProcessedList = 'getProcessedList';
//稍后处理
export const getLaterProcessingList = 'getLaterProcessingList';
//需关注
export const getNeedAttentionList = 'getNeedAttentionList';
//我发起的
export const getMyProcessList = 'getMyProcessList';
//发起人已撤回
export const getRetractedList = 'getRetractedList';
