import {
    IOnTestSingleOption,
    IStartTest,
    ITestPlugin,
    ITestConfigItem,
    ITestPluginConfigItem,
    ITestPluginReturn,
} from './type';

import defaultTestPlugin from './default-plugin';
import {countTime, isValueEqual, mergeArgs, assert} from './util';
import createTestProcess from './test-process';

export {assert} from './util';

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

    const trigTestProcess = ({
        index, time, result, name = ''
    }: {
        index: number, time: number, result: ITestPluginReturn, name?: string,
    }) => {
        testedNum ++;
        const singleOption: IOnTestSingleOption = {
            ...result,
            index,
            time,
        };
        if (name) singleOption.name = name;
        onTestProcess(singleOption, testedNum === length);
    };

    cases.forEach(async (item, index) => {
        let time: number, result: ITestPluginReturn | Promise<ITestPluginReturn>;
        if (item.disabled) {
            time = 0;
            result = {
                passed: true,
                disabled: true,
                result: '',
            };
        } else {
            const startTime = Date.now();
            const mergedArgs = mergeArgs(args, item.args);
            if (typeof item.test !== 'function') {
                item.test = () => item.test; // 支持test传入非函数
            } else {
                item.test = item.test.bind(item);
            }
            if (typeof item.expect === 'function') { // 支持expect传入函数
                item.expect = item.expect.call(item, mergedArgs);
            }
            // 选择插件 执行test
            try {
                result = pickPlugin(item, plugin)(item as ITestPluginConfigItem, mergedArgs);
                if (result instanceof Promise) { // 兼容 async plugin
                    result = await result;
                }
            } catch (e) {
                console.error(e);
                // @ts-ignore
                result = null;
            }
            time = countTime(startTime);
        }
        trigTestProcess({
            name: item.name,
            index,
            time,
            // @ts-ignore
            result,
        });
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
    assert,
    isValueEqual,
    defaultPlugin,
};