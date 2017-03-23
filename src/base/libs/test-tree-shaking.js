/**
 *
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

export function add(a, b) {
    return a + b;
}

export function sub(c, d) {
    return c - d;
}

export default {
    getFoo,
    getBar,
};
