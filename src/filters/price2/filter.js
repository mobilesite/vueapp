/**
 * 价格过滤器
 * @author dennis
 * @email
 * @since  17/1/21
 */

/** 格式化价格
 *  @param {string} price - 需要格式化的价格
 *  @param {bool} decimalDigits - 保留几位小数
 */
export default (price, decimalDigits) => {
    decimalDigits = decimalDigits === undefined ? decimalDigits : 2;
    if (isNaN(price)){
        price = 0;
    } else {
        price = Number(price);
    }

    // 返回处理后的值
    return price.toFixed(decimalDigits).toString();
};
