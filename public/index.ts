

import {startTest} from '../src/index';
import testAdd from './cases/test-add';
import testDefault from './cases/test-default';
import testAsync from './cases/test-async';
import testDom from './cases/test-dom';


startTest({
    args: {
        aa: '11'
    },
    config: [
        testDefault,
        testAdd,
        testAsync,
        testDom
    ],
    onTestComplete (result) {
        console.log(`总耗时（${result.time}）ms； 结果：${result.passed ? '通过' : '失败'}`);
        console.log(result);
    },
    onTestSingle (result) {
        console.log(`${result.index}: 耗时（${result.time}）ms； 结果：${result.passed ? '通过' : '失败'}`);
        if (!result.passed) {
            console.warn(result);
        }
    }
});