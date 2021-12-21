

import {ITestConfigItem} from '../../src';

async function timeout (time: number) {
    return new window.Promise(resolve => {
        window.setTimeout(() => {
            resolve(true);
        }, time);
    });
}

const asyncCase: ITestConfigItem = {
    plugin: 'asyncPlugin',
    name: '测试async',
    async test () {
        await timeout(1000);
        return [
            11
        ];
    },
    expect: [
        11
    ]
};

export default asyncCase;