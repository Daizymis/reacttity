const ListPage = {
    searchBtn: '查询',
    clearBtn: '清空',
    openBtn: '展开',
    closeBtn: '收起',
    setTableTitle: '设置表头',
    cancelBtn: '取消',
    saveBtn: '保存',
    selectItemText: '选项展示项',
    restTable: '恢复默认',
    emailNotice: '邮件通知',
    approvalFlowModel: '审批流模式',
    parameterModel: '台账模式',
    startTime: '开始时间',
    endTime: '结束时间',
    rangeSeparator: '至',
    lastWeek: '最近一周',
    LastMonth: '最近一个月',
    LastThreeMonths: '最近三个月',
    searchWarning: '请输入搜索条件！',
    submitSuccess: '提交成功！',
    systemErr: '系统错误',
    dialogTitle: '提示',
    recallDialogText: '确定撤回？',
    dialogCancelBtn: '取消',
    dialogRightBtn: '确定',
    recallSuccess: '撤回成功',
    recallFail: '撤回失败',
    requestFunds: '业务请款',
    invoiceBuild: '发票',
    registerForm: '收款登记',
    clientReturnedMoney: '客户回款',
    supplierReturnedMoney: '供应商回款',
    toBeConfirmed: '待确认',
    edit: '编辑',
    delete: '删除',
    recall: '撤回',
    refundInvoice: '退票',
    download: '下载',
    correalte: '关联',
    terminate: '终止',
    cancell: '撤单',
    change: '改单',
    tableHeadSetSuccess: '表头设置成功',
    tableHeadRestSuccess: '重置表头成功',
    myHandlingFormat: [
      {
        key: 4,
        lvalue: "<i className='yfont_blue'>需关注</i>",
        value: '需关注'
      },
      {
        key: 0,
        lvalue: "<i className='yfont_red'>未处理</i>",
        value: '未处理'
      },
      {
        key: 1,
        lvalue: "<i className='yfont_green'>已处理</i>",
        value: '已处理'
      },
      {
        key: 2,
        lvalue: "<i className='yfont_blue'>我发起的</i>",
        value: '我发起的'
      },
      {
        key: 3,
        lvalue: "<i className='yfont_red'>发起人已撤回</i>",
        value: '发起人已撤回'
      }
    ],
    statusFormat: [
      {
        key: 1,
        lvalue: "<i className='yfont_orange'>处理中</i>",
        value: '处理中'
      },
      {
        key: 2,
        lvalue: "<i className='yfont_green'>已通过</i>",
        value: '已通过'
      },
      {
        key: 3,
        lvalue: "<i className='yfont_red'>已驳回</i>",
        value: '已驳回'
      },
      {
        key: 0,
        lvalue: "<i className='yfont_orange'>已提交</i>",
        value: '已提交'
      },
      {
        key: 6,
        lvalue: "<i className='yfont_red'>已撤回</i>",
        value: '已撤回'
      }
    ],
    /*移动端*/
    allOption: '全部',
    //时间
    today: '今日',
    yesterday: '昨日',
    last7Days: '最近7天',
    last30Days: '最近30天',
    custom: '自定义',
    //流程进度
    status0: '已提交',
    status1: '处理中',
    status2: '已通过',
    status3: '已驳回',
    status6: '已撤回',
    // 我的处理
    fstatus0: '未处理',
    fstatus1: '已处理',
    fstatus2: '我发起的',
    fstatus3: '发起人已撤回',
    fstatus4: '需关注',
    //
    myHandling: '我的处理',
    status: '流程进度',
    marked: '稍后处理'
  };
  export default ListPage;
  