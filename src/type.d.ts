/*
 * @Author: chenzhongsheng
 * @Date: 2022-06-02 07:29:17
 * @Description: Coding something
 */
export interface ITestFunction {
    (this: ITestConfigItem, args: IMergedArgs): any;
}

type TTestObject = ITestFunction | object | string | number | bigint | boolean | symbol | undefined | null;

interface ITestConfigItemBase {
    name?: string;
    args?: any;
    plugin?: ITestPlugin;
    disabled?: boolean;
}

export interface ITestConfigItem extends ITestConfigItemBase {
    test: TTestObject;
    expect: TTestObject;
}

export interface ITestPluginConfigItem extends ITestConfigItemBase {
    test: ITestFunction;
    expect: any;
}

export interface IStartOption {
    cases: ITestConfigItem[];
    args?: any;
    plugin?: ITestPlugin;
    onTestSingle?: IOnTestSingle;
    onTestComplete?: IOnTestComplete;
}

export interface IOnTestSingle {
    (args: IOnTestSingleOption): void;
}

export interface IOnTestComplete {
    (args: IOnTestCompleteOption): void;
}

export interface ITestPluginReturn {
    passed: boolean;
    result: any;
    expect?: any;
    disabled?: boolean;
}

export interface IOnTestSingleOption extends ITestPluginReturn {
    name?: string;
    index: number;
    time: number;
}

export interface IOnTestCompleteOption {
    passed: boolean;
    results: IOnTestSingleOption[];
    time: number;
}

export interface Json<K = any> {
    [key: string]: K;
}

export type TExpectObject = Json | any[];

export interface ITestPlugin {
    (config: ITestPluginConfigItem, mergedArgs: IMergedArgs): ITestPluginReturn | Promise<ITestPluginReturn>
}

export interface IStartTest {
    (option: IStartOption): void
}

export interface IIsValueEqual{
    (v1: any, v2: any): boolean;
}
 
export interface IMergedArgs {
    $global: any;
    $local: any;
    assert(v1: any, v2: any): any;
    [prop: string]: any;
}

export interface IMergeArgs {
    (global: any, local: any): IMergedArgs;
}