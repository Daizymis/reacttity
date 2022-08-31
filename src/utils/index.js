import http from "./http";
import Cookie from "./cookie";

const utils = {
  http,
  Cookie,
};
/***
 * key：字段值
 * list：拼配列表数据
 * checkKey：list中元素要与key相等的属性名
 * 返回所匹配到的元素对象
 */
export const dealKeyReturnValue = (key, list, checkKey) => {
  const arr = list || [];
  const obj = arr.find((item) => {
    return item[checkKey] === key;
  });
  if (obj) {
    return obj;
  }
  return {};
};
/***
 * key：字段值
 * list：拼配列表数据
 * checkKey：list中元素要与key相等(由于字符串与数字的混乱此处用双等)的属性名
 * 返回所匹配到的元素对象
 */
export const dealKeyReturnValue1 = (key, list, checkKey) => {
  const arr = list || [];
  const obj = arr.find((item) => {
    return item[checkKey].toString() == key.toString();
  });
  if (obj) {
    return obj;
  }
  return {};
};
export default utils;
export { http, Cookie };
