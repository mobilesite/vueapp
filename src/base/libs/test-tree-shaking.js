/**
 * @module libs/test-tree-shaking
 * @author dennis
 * @email
 * @since  17/1/15
 */
function getFoo() {
    return 'foo';
}

function getBar() {
    return 'bar';
}

/**
 * 求和
 * @param {number} a - 被加数
 * @param {number} b - 加数
 * @return {number} 和
 */
export function add(a, b) {
    return a + b;
}

/**
 * 求差
 * @param {number} c - 被减数
 * @param {number} d - 减数
 * @return {number} 差
 */
export function sub(c, d) {
    return c - d;
}

export default {
    /**
     * getFoo
     * @function
     * @return {string}
     */
    getFoo,
    /**
     * getBar
     * @function
     * @return {string}
     */
    getBar
};
