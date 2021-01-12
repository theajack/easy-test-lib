export interface ITestConfigItem {
    name?: string;
    test(args: any): any;
    expect: any;
    args?: any;
}

export interface IStartOption {
    config: ITestConfigItem[];
    args?: any;
    onTestSingle?: IOnTestSingle;
    onTestComplete?: IOnTestComplete;
}

export interface IOnTestSingle {
    (args: IOnTestSingleOption): void;
}

export interface IOnTestComplete {
    (args: IOnTestCompleteOption): void;
}

export interface IOnTestSingleOption {
    name?: string;
    passed: boolean;
    result: any;
    expect?: any;
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