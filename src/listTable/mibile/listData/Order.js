import { flowTypeFormat, myHandlingFormat, SortWay, timeFormat } from './enum';
const Order = {
  type: 57,
  typeDesc: '下单',
  orderName: 'updatetime',
  orderBy: SortWay.ASC,
  listdataurl:'',
  myDealStatus: {
    key: 'fstatus',
    format: myHandlingFormat,
    search: true
  },
  flowType: {
    key: 'status',
    format: flowTypeFormat,
    search: true
  },
  searchInfo: {
    fields: ['supplier', 'media', 'collectionbody', 'custName', 'payfirm', 'orderseq'],
    value: ''
  },
  listItem: [
    {
      label: '下单标识',
      key: 'reorderstatus',
      type: 'select',
      search: true,
      selectData: {
        url: '/api/getDictionary/OrderStatus',
        key: 'key',
        label: 'value',
        value: 'key'
      }
    },
    {
      label: '投放周期',
      key: 'updatetime',
      type: 'date',
      search: true,
      format: timeFormat,
      showFormat: 'yyyy-MM-DD',
    },
    {
      label: '下单编号',
      key: 'orderseq',
      type: 'input',
      search: true
    },
    {
      label: '供应商',
      key: 'supplier',
      type: 'input',
      search: true
    },
    {
      label: '媒体简称',
      key: 'media',
      type: 'input',
      search: true
    },
    {
      label: '付款主体',
      key: 'payfirm',
      type: 'input',
      search: true
    }
  ]
};

export default Order;
