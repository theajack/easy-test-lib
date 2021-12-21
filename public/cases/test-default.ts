import {ITestConfigItem} from '../../src';

const defaultCase: ITestConfigItem = {
    name: '测试default',
    test () {
        return [
            11
        ];
    },
    expect: [
        11
    ]
};

export default defaultCase;