
import {
    ITestPlugin
} from '../type';
import {isValueEqual} from '../util';

let plugin: ITestPlugin = async ({
    test, expect, args
}, argsConfig) => {
    let result = await test.call({
        test, expect, args
    }, argsConfig, args);
    return {
        result,
        expect,
        passed: isValueEqual(result, expect),
    };
};

export default plugin;