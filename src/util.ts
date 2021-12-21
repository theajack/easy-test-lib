import {Json, TExpectObject, IIsValueEqual, IMergedArgs} from './type';

export const isValueEqual: IIsValueEqual = (v1, v2) => {
    if (typeof v1 !== typeof v2) return false;
    if (typeof v1 === 'object') return objectEqual(v1, v2);
    if (typeof v1 === 'function') return isValueEqual(v1(), v2());
    return v1 === v2;
};

const ObjectCheckMap = [
    {
        type: Date,
        check: (v1: Date, v2: Date) => v1.getTime() === v2.getTime()
    },
    {
        type: RegExp,
        check: (v1: RegExp, v2: RegExp) => v1.toString() === v2.toString()
    },
    (typeof HTMLElement === 'function') ? {
        type: window.HTMLElement,
        check: (v1: HTMLElement, v2: HTMLElement) => v1.outerHTML === v2.outerHTML
    } : null
];

function objectEqual (o1: TExpectObject, o2: TExpectObject) {
    if (o1 === null || o2 === null) return o1 === o2;

    for (let i = 0; i < ObjectCheckMap.length; i++) {
        const map = ObjectCheckMap[i];
        if (!map) break;

        if (o1 instanceof map.type) {
            return (o2 instanceof map.type) ? map.check(o1 as any, o2 as any) : false;
        } else if (o2 instanceof map.type) {
            return false;
        }
    }
    
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
        for (const key in result) {
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

export function mergeArgs (global: any, local: any) {
    const args: IMergedArgs = {
        $global: global,
        $local: local
    };
    if (typeof global === 'object' && global !== null) {
        Object.assign(args, global);
    }
    if (typeof local === 'object' && local !== null) {
        Object.assign(args, local);
    }
    return args;
}