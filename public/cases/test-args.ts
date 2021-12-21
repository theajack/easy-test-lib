/*
 * @Author: tackchen
 * @Date: 2021-12-20 10:07:31
 * @LastEditors: tackchen
 * @FilePath: /easy-test-lib/public/cases/test-args.ts
 * @Description: Coding something
 */

import {ITestConfigItem} from '../../src';

const config: ITestConfigItem[] = [{
    name: '测试合并参数',
    args: {caseArg: {a: 1}},
    test (args) {
        return [args.commonArg, args.caseArg];
    },
    expect (args) {
        return [args.commonArg, args.caseArg];
    }
}, {
    name: '测试this',
    args: {caseArg: {a: 1}},
    test () {
        return [this.name, this.args.caseArg];
    },
    expect: ['测试this', {a: 1}]
}];

export default config;