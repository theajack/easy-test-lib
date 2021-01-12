import {IOnTestComplete, IOnTestSingle, IOnTestSingleOption, IStartOption, ITestConfigItem, Json, TExpectObject} from './type';

function testSingle ({
    name, test, expect, args
}: ITestConfigItem, argsConfig: any): IOnTestSingleOption {
    let result;
    if (args instanceof Array) {
        result = test.apply(argsConfig, args.map((item) => {
            return argsConfig[item];
        }));
    } else {
        result = test.call(argsConfig, argsConfig);
    }
    let res: IOnTestSingleOption = {
        result,
        expect,
        name,
        passed: false,
    };
    if (typeof result !== typeof expect) {
        res.passed = false;
    } else {
        if (typeof result === 'object') {
            res.passed = objectEqual(result, expect);
        } else {
            res.passed = (result === expect);
        }
    }
    return res;
};

function createTestProcess (_onTestSingle?: IOnTestSingle, _onTestComplete?: IOnTestComplete) {
    let results: IOnTestSingleOption[] = [];
    let passed = true;
    let startTime = new Date().getTime();

    return (option: IOnTestSingleOption, isLastOne:boolean = false) => {
        if (_onTestSingle) {
            _onTestSingle(option);
        }
        if (!option.passed && passed) {
            passed = false;
        }
        results.push(option);
        if (isLastOne) {
            if (_onTestComplete) {
                _onTestComplete({
                    passed,
                    time: new Date().getTime() - startTime,
                    results
                });
            }
        
        }
    };
}

function startTest ({
    config,
    args,
    onTestSingle,
    onTestComplete,
}: IStartOption): void {
    let onTestProcess = createTestProcess(onTestSingle, onTestComplete);
    let n = config.length;
    config.forEach((item, index) => {
        let result = testSingle(item, args);
        onTestProcess(result, index === n - 1);
    });
}

function objectEqual (o1: TExpectObject, o2: TExpectObject) {
    return objectEqualBase(o1, o2) && objectEqualBase(o2, o1);
}

function objectEqualBase (result: TExpectObject, expect: TExpectObject): boolean {
    // 数组需要下标一致
    if (result instanceof Array) {
        for (let i = 0; i < result.length; i++) {
            if (!objectEqualBaseSingle(result[i], (expect as any[])[i])) {
                return false;
            };
        }
    } else {
        for (let key in result) {
            if (!objectEqualBaseSingle(result[key], (expect as Json)[key])) {
                return false;
            };
        }
    }
    return true;
}

function objectEqualBaseSingle (resultItem: any, expectItem: any) {
    let equal: boolean = true;
    if (typeof resultItem !== typeof expectItem) {
        equal = false;
    } else if (typeof resultItem === 'object') {
        if (!objectEqual(resultItem, expectItem)) {
            equal = false;
        }
    } else if (resultItem !== expectItem) {
        equal = false;
    }
    return equal;
}


export default startTest;
// console.log(cnchar.stroke('一个', 'order'));
// console.log(cnchar.stroke('長城', 'count', 'order', 'name'));
// console.log(cnchar.orderToWord(['横', '撇', '捺']));
// console.log('美好的地方'.spell('tone'));
// module.exports = cnchar
