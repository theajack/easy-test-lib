
import {ITestConfigItem} from '../../src';

function add (x: number, y: number) {
    return x + y;
}

let config: ITestConfigItem = {
    name: '测试add',
    test () {
        return add(2, 3);
    },
    expect: 5
};
export default config;