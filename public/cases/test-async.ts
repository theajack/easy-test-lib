

import {ITestConfigItem} from '../../src';

async function timeout (time: number) {
    return new window.Promise(resolve => {
        window.setTimeout(() => {
            resolve(true);
        }, time);
    });
}

const asyncCase: ITestConfigItem = {
    args: {aa: 22},
    plugin: 'asyncPlugin',
    name: '测试async',
    async test (args: any) {
        await timeout(2000);
        console.log(args, this.args);
        return [
            11
        ];
    },
    expect: [
        11
    ]
};

export default asyncCase;