/*
 * @Author: chenzhongsheng
 * @Date: 2022-06-02 07:29:17
 * @Description: Coding something
 */

import {ITestConfigItem} from '../../src';

function add (x: number, y: number) {
    return x + y;
}

const config: ITestConfigItem = {
    name: '测试add',
    test ({assert}) {
        // console.warn(1);
        assert(add(2, 3), 4);
        return add(2, 3);
    },
    expect: 5
};
export default config;