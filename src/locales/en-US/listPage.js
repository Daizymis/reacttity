const ListPage = {
    searchBtn: 'Search',
    clearBtn: 'Clear',
    openBtn: 'Unfold',
    closeBtn: 'Fold',
    setTableTitle: 'Set the header',
    cancelBtn: 'Cancel',
    saveBtn: 'Save',
    selectItemText: 'Select Field ',
    restTable: 'Restore Defaults',
    emailNotice: 'emailNotice',
    approvalFlowModel: 'Approval workflow mode',
    parameterModel: 'Account mode',
    startTime: ' start time',
    endTime: ' end time',
    rangeSeparator: 'to',
    lastWeek: 'lastWeek',
    LastMonth: 'LastMonth',
    LastThreeMonths: 'LastThreeMonths',
    searchWarning: 'Please enter your search criteria',
    submitSuccess: 'Submitted successfully',
    systemErr: 'System error',
    dialogTitle: 'Tips',
    recallDialogText: 'Do you want to withdrawal this process?',
    dialogCancelBtn: 'Cancel',
    dialogRightBtn: 'Yes',
    recallSuccess: 'Application withdrawn.',
    recallFail: 'Recall Failed',
    requestFunds: 'Payment Application',
    invoiceBuild: 'Invoice Order',
    registerForm: 'Cash Receipts',
    clientReturnedMoney: 'Customer Amount',
    supplierReturnedMoney: 'Cash Receipts（Supplier Refund）',
    toBeConfirmed: '待确认', // 国际化版本下不展示，暂时不用翻译
    edit: 'Edit',
    delete: 'Del',
    recall: 'Withdraw',
    refundInvoice: 'Refund',
    download: 'download',
    correalte: 'Association',
    terminate: 'Terminate',
    cancell: 'Cancelled',
    change: 'Changed',
    tableHeadSetSuccess: 'The header was set successfully',
    tableHeadRestSuccess: 'The reset of the header was successful',
    myHandlingFormat: [
      {
        key: 4,
        lvalue: "<i className='yfont_blue'>Need to Focus on</i>",
        value: 'Need to Focus on'
      },
      {
        key: 0,
        lvalue: "<i className='yfont_red'>Pending</i>",
        value: 'Pending'
      },
      {
        key: 1,
        lvalue: "<i className='yfont_green'>Solved</i>",
        value: 'Solved'
      },
      {
        key: 2,
        lvalue: "<i className='yfont_blue'>My Application</i>",
        value: 'My Application'
      },
      {
        key: 3,
        lvalue: "<i className='yfont_red'>Withdrawn</i>",
        value: 'Withdrawn'
      }
    ],
    statusFormat: [
      {
        key: 1,
        lvalue: "<i className='yfont_orange'>Processing</i>",
        value: 'Processing'
      },
      {
        key: 2,
        lvalue: "<i className='yfont_green'>Approved</i>",
        value: 'Approved'
      },
      {
        key: 3,
        lvalue: "<i className='yfont_red'>Rejected</i>",
        value: 'Rejected'
      },
      {
        key: 0,
        lvalue: "<i style='color:#F5A623'>Submitted</i>",
        value: 'Submitted'
      },
      {
        key: 6,
        lvalue: "<i className='yfont_red'>Withdrawn</i>",
        value: 'Withdrawn'
      }
    ],
    /*移动端*/
    allOption: 'All',
    //时间
    today: 'Today',
    yesterday: 'Yesterday',
    last7Days: 'Last 7 Days',
    last30Days: 'Last 30 Days',
    custom: 'Custom',
    //流程进度
    status0: 'Submitted',
    status1: 'Processing',
    status2: 'Approved',
    status3: 'Rejected',
    status6: 'Withdrawn',
    // 我的处理
    fstatus0: 'Pending',
    fstatus1: 'Solved',
    fstatus2: 'My Application',
    fstatus3: 'Withdrawn',
    fstatus4: 'Need to Focus on',
    //
    myHandling: 'My Handling',
    status: 'Status',
    marked: 'Marked'
  };
  export default ListPage;
  