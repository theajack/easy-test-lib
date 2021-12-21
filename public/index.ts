

import {startTest} from '../src/index';
// import {startTest} from '../npm/easy-test-lib.min.js';
import testAdd from './cases/test-add';
import testDefault from './cases/test-default';
import testAsync from './cases/test-async';
import testDom from './cases/test-dom';
import testObject from './cases/test-object';
import testArgs from './cases/test-args';

// console.log(startTest);
startTest({
    args: {
        commonArg: 'commonArg'
    },
    cases: [
        testDefault,
        testAdd,
        testAsync,
        testDom,
        ...testObject,
        ...testArgs,
    ],
    onTestComplete (result) {
        console.log(`总耗时（${result.time}）ms； 结果：${result.passed ? '通过' : '失败'}`);
        console.log(result);
    },
    onTestSingle (result) {
        console.log(`${result.name}[${result.index}]: 耗时（${result.time}）ms； 结果：${result.passed ? '通过' : '失败'}`);
        if (!result.passed) {
            console.warn(result);
        }
    }
});