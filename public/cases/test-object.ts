
import {ITestConfigItem} from '../../src';


const config: ITestConfigItem[] = [{
    name: '测试null',
    test () {
        return null;
    },
    expect: null
}, {
    name: '测试json',
    test () {
        return {a: 1, b: {b: 2}};
    },
    expect: {b: {b: 2}, a: 1}
}, {
    name: '测试array',
    test () {
        return [1, {a: 1}];
    },
    expect: [1, {a: 1}]
}, {
    name: '测试DOM',
    test () {
        const dom = window.document.createElement('div');
        dom.innerHTML = 'dom';
        return dom;
    },
    expect () {
        const dom = window.document.createElement('div');
        dom.innerHTML = 'dom';
        return dom;
    }
}, {
    name: '测试Date',
    args: new Date().getTime(),
    test (args) {
        return new Date(args.$local);
    },
    expect (args) {
        return new Date(args.$local);
    }
}];
export default config;