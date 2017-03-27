import Promise from 'libs/es6-promise-auto';

/* eslint-disable no-console */
console.log(Promise);
/* eslint-enable no-console */

function deffer(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('执行完成');// eslint-disable-line
            resolve('随便什么数据');
        }, 2000);
    });
}
deffer().then((data) => {
    console.log(data);// eslint-disable-line
});
