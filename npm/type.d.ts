export interface ITestConfigItem {
    name?: string;
    test(args: any, localArgs: any): any;
    expect: any;
    args?: any;
    plugin?: TTestPlugin;
}

export interface IStartOption {
    cases: ITestConfigItem[];
    args?: any;
    plugin?: TTestPlugin;
    onTestSingle?: IOnTestSingle;
    onTestComplete?: IOnTestComplete;
}

export type TTestPlugin = ITestPlugin | 'defaultPlugin' | 'asyncPlugin';

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
    (config: ITestConfigItem, argsConfig: any): ITestPluginReturn | Promise<ITestPluginReturn>
}

export interface IStartTest {
    ({
        cases,
        args,
        onTestSingle,
        onTestComplete,
        plugin,
    }: IStartOption): void
}

export interface IIsValueEqual{
    (v1: any, v2: any): boolean;
}