
import {
    ITestPlugin
} from '../type';
import {isValueEqual} from '../util';

const plugin: ITestPlugin = ({
    test, expect, args
}, argsConfig) => {
    const result = test.call({
        test, expect, args
    }, argsConfig, args);
    return {
        result,
        expect,
        passed: isValueEqual(result, expect),
    };
};

export default plugin;