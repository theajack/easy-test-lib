import {ITestPlugin, IStartTest, IIsValueEqual} from './type';

export {
    ITestConfigItem,
    ITestPlugin,
    IStartTest,
    IIsValueEqual,
    IMergedArgs,
} from './type';

export const defaultPlugin: ITestPlugin;

export const asyncPlugin: ITestPlugin;

export const startTest: IStartTest;

export function assert(v1: any, v2: any): void;

export const isValueEqual: IIsValueEqual;