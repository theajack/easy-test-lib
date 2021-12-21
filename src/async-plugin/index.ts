
import {
    ITestPlugin
} from '../type';
import {isValueEqual} from '../util';

const plugin: ITestPlugin = async (item, mergedArgs) => {
    const {test, expect} = item;
    const result = await test.call(item, mergedArgs);
    return {
        result,
        expect,
        passed: isValueEqual(result, expect),
    };
};

export default plugin;