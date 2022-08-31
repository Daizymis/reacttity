/**
 * 防抖
 * 第一次点击时执行
 * @param func
 * @param wait
 * @returns {function(...[*]=)}
 */
export function debounce(func, wait = 300) {
  let timeout = null;
  let count = 0;
  let prev = 0;
  let current = 0;
  prev = new Date();
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timeout);
    current = new Date();
    if (!count) {
      func.apply(context, args);
      prev = new Date();
      count++;
    } else {
      count++;
      timeout = setTimeout(function () {
        if (current - prev > wait) {
          func.apply(context, args);
          prev = new Date();
        }
        count = 0;
      }, wait);
    }
  };
}

export const throttle = (fn, wait = 300) => {
  let args = arguments;
  let timeout = null;
  let prev = null;
  return () => {
    if (prev) {
      return;
    }
    prev = true;
    timeout = setTimeout(() => {
      fn.apply(this, args);
      clearTimeout(timeout);
      prev = null;
    });
  };
};
