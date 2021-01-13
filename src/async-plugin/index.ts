
import {
    ITestPlugin
} from '../type';
import {isValueEqual} from '../util';

const plugin: ITestPlugin = async ({
    test, expect, args
}, argsConfig) => {
    const result = await test.call({
        test, expect, args
    }, argsConfig, args);
    return {
        result,
        expect,
        passed: isValueEqual(result, expect),
    };
};

export default plugin;