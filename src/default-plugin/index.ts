
import {
    ITestPlugin
} from '../type';
import {isValueEqual} from '../util';

const plugin: ITestPlugin = (item, mergedArgs) => {
    const {test, expect} = item;
    const result = test.call(item, mergedArgs);
    return {
        result,
        expect,
        passed: isValueEqual(result, expect),
    };
};

export default plugin;