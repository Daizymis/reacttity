export function NumFormat(value, n = 2) {
    if (value === '-') {
        return value;
    }
    if (value == '' || !value || value === 0 || isNaN(value)) return '0.00';
    //Math.round(num*100)/100
    let intPartFormat = Number(value)
        .toFixed(n)
        .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); //将整数部分逢三一断
    return intPartFormat;
}
