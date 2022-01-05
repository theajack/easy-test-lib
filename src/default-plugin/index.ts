
import {
    ITestPlugin
} from '../type';
import {isValueEqual} from '../util';

function buildResult (result: any, expect: any) {
    return {
        result,
        expect,
        passed: isValueEqual(result, expect),
    };
}

const plugin: ITestPlugin = (item, mergedArgs) => {
    const {test, expect} = item;
    const result = test.call(item, mergedArgs);
    if (result instanceof Promise) {
        return new Promise((resolve) => {
            result.then(data => {
                resolve(buildResult(data, expect));
            });
        });
    }
    return buildResult(result, expect);
};

export default plugin;