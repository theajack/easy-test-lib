
import {
    ITestPlugin
} from '../type';
import {isValueEqual} from '../util';

const plugin: ITestPlugin = async (item, mergedArgs) => {
    const {test, expect} = item;
    let result = test.call(item, mergedArgs);
    if (result instanceof Promise) {
        result = await result;
    }
    return {
        result,
        expect,
        passed: isValueEqual(result, expect),
    };
};

export default plugin;