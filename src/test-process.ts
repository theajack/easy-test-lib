/*
 * @Author: chenzhongsheng
 * @Date: 2022-06-02 07:29:17
 * @Description: Coding something
 */
import {
    IOnTestComplete,
    IOnTestSingle,
    IOnTestSingleOption,
} from './type';
import {countTime} from './util';

export default function createTestProcess (onTestSingle?: IOnTestSingle, onTestComplete?: IOnTestComplete) {
    const results: IOnTestSingleOption[] = [];
    let passed = true;
    const startTime = new Date().getTime();

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