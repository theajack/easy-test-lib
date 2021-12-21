import {
    IOnTestSingleOption,
    IStartTest,
    ITestPlugin,
    TTestPlugin,
    ITestConfigItem,
    ITestPluginConfigItem,
} from './type';

import defaultTestPlugin from './default-plugin';
import asyncTestPlugin from './async-plugin';
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

function pickPlugin (item: ITestConfigItem, plugin?: TTestPlugin): ITestPlugin {
    if (item.plugin) {
        if (typeof item.plugin === 'string') {
            return checkPluginByString(item.plugin);
        }
        return item.plugin as ITestPlugin;
    }
    if (typeof plugin === 'string') {
        return checkPluginByString(plugin);
    }
    return defaultTestPlugin;
}

function checkPluginByString (plugin: 'asyncPlugin' | 'defaultPlugin'): ITestPlugin {
    return plugin === 'asyncPlugin' ? asyncTestPlugin : defaultTestPlugin;
}

export {
    isValueEqual
} from './util';

export const defaultPlugin = defaultTestPlugin;
export const asyncPlugin = asyncTestPlugin;

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
    asyncPlugin,
};