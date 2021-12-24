import {
    IOnTestSingleOption,
    IStartTest,
    ITestPlugin,
    ITestConfigItem,
    ITestPluginConfigItem,
} from './type';

import defaultTestPlugin from './default-plugin';
import {countTime, isValueEqual, mergeArgs} from './util';
import createTestProcess from './test-process';

export const startTest:IStartTest = ({
    cases,
    args,
    onTestSingle,
    onTestComplete,
    plugin,
}) => {
    const onTestProcess = createTestProcess(onTestSingle, onTestComplete);
    const length = cases.length;
    let testedNum = 0;
    cases.forEach(async (item, index) => {
        if (item.disabled) return;
        const mergedArgs = mergeArgs(args, item.args);
        if (typeof item.test !== 'function') {
            item.test = () => item.test; // 支持test传入非函数
        } else {
            item.test = item.test.bind(item);
        }
        if (typeof item.expect === 'function') { // 支持expect传入函数
            item.expect = item.expect.call(item, mergedArgs);
        }
        const startTime = new Date().getTime();
        let result = pickPlugin(item, plugin)(item as ITestPluginConfigItem, mergedArgs);
        if (result instanceof Promise) { // 兼容 async plugin
            result = await result;
        }
        testedNum ++;
        const singleOption: IOnTestSingleOption = {
            ...result,
            index,
            time: countTime(startTime),
        };
        if (item.name) {singleOption.name = item.name;}
        onTestProcess(singleOption, testedNum === length);
    });
};

function pickPlugin (item: ITestConfigItem, plugin?: ITestPlugin): ITestPlugin {
    if (item.plugin) {
        return item.plugin;
    }
    if (plugin) {
        return plugin;
    }
    return defaultTestPlugin;
}

export {
    isValueEqual
} from './util';

export const defaultPlugin = defaultTestPlugin;

export {
    ITestConfigItem,
    ITestPlugin,
    IStartTest,
    IIsValueEqual,
    IMergedArgs,
} from './type';

export default {
    startTest,
    isValueEqual,
    defaultPlugin,
};