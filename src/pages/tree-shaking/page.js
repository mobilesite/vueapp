import tree, { sub } from 'libs/test-tree-shaking';

/* eslint-disable no-alert */
alert(sub(2, 1)); // add被shake掉了
alert(tree.getFoo()); // getFoo、getBar均被保留
/* eslint-enable no-alert */
