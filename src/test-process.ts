import {
    IOnTestComplete,
    IOnTestSingle,
    IOnTestSingleOption,
} from './type';
import {countTime} from './util';

export default function createTestProcess (onTestSingle?: IOnTestSingle, onTestComplete?: IOnTestComplete) {
    let results: IOnTestSingleOption[] = [];
    let passed = true;
    let startTime = new Date().getTime();

    return (option: IOnTestSingleOption, isLastOne:boolean = false) => {
        if (onTestSingle) {onTestSingle(option);}
        if (!option.passed && passed) {passed = false;}
        
        results[option.index] = option;
        if (isLastOne) {
            if (onTestComplete) {
                onTestComplete({
                    passed,
                    time: countTime(startTime),
                    results
                });
            }
        }
    };
}