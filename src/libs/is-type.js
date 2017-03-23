/**
 *
 * @author dennis
 * @email  
 * @since  17/1/14
 */

export default function isType(obj, type) {
    const toString = Object.prototype.toString;
    const fourBaseTypes = {
        undefined: 'undefined',
        number: 'number',
        boolean: 'boolean',
        string: 'string',
    };
    return (fourBaseTypes[typeof obj] === type) ||
        (type === 'null' && obj === null) ||
        (type === 'function' && typeof document.getElementById === 'object' ?
            /^\s*\bfunction\b/.test(`${obj}`) : toString.call(obj).slice(8, -1) === type) ||
        obj instanceof type;
}
