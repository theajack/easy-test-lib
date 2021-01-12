import {
    IOnTestComplete,
    IOnTestSingle,
    IOnTestSingleOption,
} from './type';
import {countTime} from './util';

export default function createTestProcess (_onTestSingle?: IOnTestSingle, _onTestComplete?: IOnTestComplete) {
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
        results[option.index] = option;
        if (isLastOne) {
            if (_onTestComplete) {
                _onTestComplete({
                    passed,
                    time: countTime(startTime),
                    results
                });
            }
        }
    };
}