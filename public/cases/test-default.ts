import {ITestConfigItem} from '../../src';

const defaultCase: ITestConfigItem = {
    args: {aa: 22},
    name: '测试default',
    test (args: any) {
        console.log(args, this.args);
        return [
            11
        ];
    },
    expect: [
        11
    ]
};

export default defaultCase;