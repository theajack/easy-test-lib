import {Json, TExpectObject, IIsValueEqual} from './type';

export let isValueEqual: IIsValueEqual = (v1, v2) => {
    return (typeof v1 !== typeof v2) ?
        false :
        ((typeof v1 === 'object') ? objectEqual(v1, v2) : (v1 === v2));
};

function objectEqual (o1: TExpectObject, o2: TExpectObject) {
    return objectEqualBase(o1, o2) && objectEqualBase(o2, o1);
}

function objectEqualBase (result: TExpectObject, expect: TExpectObject): boolean {
    // 数组需要下标一致
    if (result instanceof Array) {
        for (let i = 0; i < result.length; i++) {
            if (!objectEqualBaseSingle(result[i], (expect as any[])[i])) {
                return false;
            };
        }
    } else {
        for (let key in result) {
            if (!objectEqualBaseSingle(result[key], (expect as Json)[key])) {
                return false;
            };
        }
    }
    return true;
}

function objectEqualBaseSingle (resultItem: any, expectItem: any) {
    let equal: boolean = true;
    if (typeof resultItem !== typeof expectItem) {
        equal = false;
    } else if (typeof resultItem === 'object') {
        if (!objectEqual(resultItem, expectItem)) {
            equal = false;
        }
    } else if (resultItem !== expectItem) {
        equal = false;
    }
    return equal;
}

export function countTime (startTime: number): number {
    return new Date().getTime() - startTime;
}