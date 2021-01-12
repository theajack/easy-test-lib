import {
    IOnTestSingleOption,
    IStartTest
} from './type';

import defaultTestPlugin from './default-plugin';
import asyncTestPlugin from './async-plugin';
import {countTime} from './util';
import createTestProcess from './test-process';


export const startTest:IStartTest = ({
    config,
    args,
    onTestSingle,
    onTestComplete,
    plugin,
}) => {
    let onTestProcess = createTestProcess(onTestSingle, onTestComplete);
    let length = config.length;
    let testedNum = 0;
    config.forEach(async (item, index) => {
        let startTime = new Date().getTime();
        if (!item.plugin) {
            item.plugin = plugin || defaultTestPlugin;
        }
        let result = item.plugin(item, args);
        if (result instanceof window.Promise) {
            result = await result;
        }
        testedNum ++;
        let singleOption: IOnTestSingleOption = {
            ...result,
            index,
            time: countTime(startTime),
        };
        if (item.name) {singleOption.name = item.name;}
        onTestProcess(singleOption, testedNum === length);
    });
};

export {
    isValueEqual
} from './util';

export let defaultPlugin = defaultTestPlugin;
export let asyncPlugin = asyncTestPlugin;

export {
    ITestConfigItem,
    ITestPlugin,
    IStartTest,
    IIsValueEqual,
} from './type';
