import {ITestConfigItem} from '../../src';

const defaultCase: ITestConfigItem[] = [{
    name: '测试default',
    test () {
        return [
            11
        ];
    },
    expect: [
        11
    ]
}, {
    name: '测试disable 跳过',
    disabled: true,
    test () {
        return [
            11
        ];
    },
    expect: [
        11
    ]
}, {
    name: '测试Symbol',
    args: {caseArg: {a: 1}},
    test () {
        // return [this.name, this.args.caseArg];
        // console.log('*****************', this.name, this.expect);
        return this.expect;
    },
    // expect: ['测试this', {a: 1}]
    expect: window.Symbol(111)
}];

export default defaultCase;