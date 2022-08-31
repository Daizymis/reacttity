import i18n from "../../../locales";
export const SortWay = {
    ASC:'asc',
    DESC:'desc'
}
export const flowTypeFormat = [
    {
      value: 0,
      color: '#faad14',
      label: '已提交'
    //   label: i18n.t('listPage.status0')
    },
    {
      value: 1,
      color: '#fa8c16',
      label: '处理中'
    //   label: i18n.t('listPage.status1')
    },
    {
      value: 2,
      color: '#52c41a',
      label: '已通过'
    //   label: i18n.t('listPage.status2')
    },
    {
      value: 3,
      color: '#ff4d4f',
      label: '已驳回'
    //   label: i18n.t('listPage.status3')
    },
    {
      value: 6,
      color: '#d4380d',
      label: '已撤回'
    //   label: i18n.t('listPage.status6')
    }
  ];
  //我的处理
  export const myHandlingFormat = [
    {
      value: 0,
      color: '#FA8C16',
      // label: '未处理',
      label: i18n.t('listPage.fstatus0'),
      listdataurl: 'getProcessingList',
      orderNameSelf: 'createtime'
    },
    {
      value: 0,
      color: '#ff976a',
      // label: '稍后处理',
      label: i18n.t('listPage.marked'),
      listdataurl: 'getLaterProcessingList',
      orderNameSelf: 'createtime'
    },
    {
      value: 1,
      color: '#52C41A',
      // label: '已处理',
      label: i18n.t('listPage.fstatus1'),
      listdataurl: 'getProcessedList'
    },
    {
      value: 2,
      color: '#13C2C2',
      // label: '我发起的',
      label: i18n.t('listPage.fstatus2'),
      listdataurl: 'getMyProcessList'
    },
    {
      value: 3,
      color: '#FF4D4F',
      // label: '发起人已撤回',
      label: i18n.t('listPage.fstatus3'),
      listdataurl: 'getRetractedList'
    },
    {
      value: 4,
      color: '#1890FF',
      // label: '需关注',
      label: i18n.t('listPage.fstatus4'),
      listdataurl: 'getNeedAttentionList'
    }
  ];
  //时间选择
  export const timeFormat = [
    {
      value: '',
      label: '全部',
    //   label: i18n.t('listPage.allOption')
    },
    {
      value: '今日',
      label: '今日',
    //   label: i18n.t('listPage.today')
    },
    {
      value: '昨日',
      label: '昨日',
    //   label: i18n.t('listPage.yesterday')
    },
    {
      value: '最近7天',
      // label: '最近7天',
      label: i18n.t('listPage.last7Days')
    },
    {
      value: '最近30天',
      label: '最近30天',
    //   label: i18n.t('listPage.last30Days')
    },
    {
      value: '自定义',
      label: '自定义',
    //   label: i18n.t('listPage.custom')
    }
  ];