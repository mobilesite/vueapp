import isType from 'libs/is-type';
import env from 'env';

/* eslint-disable no-console */
console.log(isType({}, Object));
/* eslint-enable no-console */

/* eslint-disable no-debugger */
// debugger;
/* eslint-enable no-debugger */

/* eslint-disable no-console*/
// alert(isType({}, Object));
console.log(new env.Version('1.2.3').lte('1.2.8'));
console.log(JSON.stringify(new env.Version('1.2.3')));
/* eslint-enable no-console*/

isType({ a: 1 }, Object);
