import Mock from 'mockjs'
import dataList from './dataList'
import todoList from './todoList'
import user from './user'
import tableList from './tableList'
import dictionary from './dictionary'
import attachment from './attachment'

const mocks = [
  ...user,
  ...dataList,
  ...todoList,
  ...dictionary,
  ...tableList,
  ...attachment
]

// mock请求方法放在这里统一处理,1是简便写法,2是如果请求路径需要加统一前缀或域名,可以在这里处理
// for (const i of mocks) {
//   const res = Mock.mock(i.url, i.type, i.response)
//   console.log(res);
// }