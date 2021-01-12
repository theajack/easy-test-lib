
import {
    ITestPlugin
} from '../type';
import {isValueEqual} from '../util';

let plugin: ITestPlugin = ({
    test, expect, args
}, argsConfig) => {
    let result = test.call({
        test, expect, args
    }, argsConfig, args);
    return {
        result,
        expect,
        passed: isValueEqual(result, expect),
    };
};

export default plugin;