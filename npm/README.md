## 🚀 A simple and small js test library

<p>
    <a href="https://www.github.com/theajack/easy-test-lib"><img src="https://img.shields.io/github/stars/theajack/easy-test-lib.svg?style=social" alt="star"></a>
    <a href="https://theajack.gitee.io"><img src="https://img.shields.io/badge/author-theajack-blue.svg?style=social" alt="Author"></a>
</p> 

<p>
    <a href="https://www.npmjs.com/package/easy-test-lib"><img src="https://img.shields.io/npm/v/easy-test-lib.svg" alt="Version"></a>
    <a href="https://npmcharts.com/compare/easy-test-lib?minimal=true"><img src="https://img.shields.io/npm/dm/easy-test-lib.svg" alt="Downloads"></a>
    <a href="https://cdn.jsdelivr.net/gh/theajack/easy-test-lib/dist/easy-test-lib.latest.min.js"><img src="https://img.shields.io/bundlephobia/minzip/easy-test-lib.svg" alt="Size"></a>
    <a href="https://github.com/theajack/easy-test-lib/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/easy-test-lib.svg" alt="License"></a>
    <a href="https://github.com/theajack/easy-test-lib/search?l=javascript"><img src="https://img.shields.io/github/languages/top/theajack/easy-test-lib.svg" alt="TopLang"></a>
    <a href="https://github.com/theajack/easy-test-lib/issues"><img src="https://img.shields.io/github/issues-closed/theajack/easy-test-lib.svg" alt="issue"></a>
    <a href="https://www.github.com/theajack/easy-test-lib"><img src="https://img.shields.io/librariesio/dependent-repos/npm/easy-test-lib.svg" alt="Dependent"></a>
</p>

**[中文](https://github.com/theajack/easy-test-lib/blob/master/README.cn.md) | [Online Use](https://theajack.gitee.io/jsbox?github=theajack.easy-test-lib) | [Feedback](https://github.com/theajack/easy-test-lib/issues/new) | [Gitee](https://gitee.com/theajack/easy-test-lib)**

### 1. Features

1. Typescript writing
2. Small size and easy to use
3. Multi-terminal support
4. Support asynchronous
5. Customizable plugins
6. Configuration file + command line operation
7. Global installation available

### 2. Installation

#### 2.1 api call

```
npm i easy-test-lib -D
```

```js
const {startTest} = require('easy-test-lib');
startTest(config);
```

#### 2.2 Configuration file call

package.json added

```
    ...
    "scripts": {
        "test": "etest <config file>"
    },
    ...
```

The configuration file defaults to the `easy.test.js` file in the root directory, which can be configured freely

Root directory execution

```
npm run test
```

#### 2.3 Global installation and use

```
npm i easy-test-lib -g
```

The configuration file is consistent with the rules in 2.2

Run the following command line in the project directory

```
etest <config file>
```

#### 2.4 CDN

```html
<script src="https://cdn.jsdelivr.net/npm/easy-test-lib/easy-test-lib.min.js"></script>
<script>
    ETest.startTest({
        // ...
    })
</script>
```

### 3 Configuration

```js
const {startTest} = require('easy-test-lib');

function add (x, y) {
    return x + y;
}

startTest({
    args: {// optional parameters
        // Used to pass in some public apis, which will be passed into test cases
    },
    cases: [// Test case configuration, it is recommended to split files
        {
            name:'Test add function', // optional
            disabled: false, // optional Whether to disable the current use case
            args: {// optional
                // The api of the current test case
            },
            test (mergedArgs) {
                // mergedArg is a combination of public arg and use case arg, in addition to mergedArg, there are two attributes: $global and $local
                // this refers to the current test case
                return add(1, 1);
            },
            expect: 2,
            // plugin: ITestPlugin, // Plug-in used by the current test case optional
        }
    ],
    onTestComplete (result) {// All tests are completed callback optional
        // result data structure is as follows
        /*
            passed: boolean;
            results: [
                {
                    passed: boolean;
                    result: any;
                    expect?: any;
                    name?: string;
                    index: number;
                    time: number;
                }
            ];
            time: number;
        */
    },
    onTestSingle (result) {// Single test case completion callback optional
        // result data structure is as follows
        /*
            passed: boolean;
            result: any;
            expect?: any;
            name?: string;
            index: number;
            time: number;
        */
    },
    // plugin: ITestPlugin, // global plugin optional
});
```

### 4 Plugins

#### 4.1 Built-in plugins

easy-test-lib has a built-in default plugin (defaultPlugin) 1.0.1 and later versions. The asynchronous plugin function is merged into the default plugin

The following is a test case using asynchronous

```js
function timeout (time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
}

const asyncCase = {
    args: {aa: 22},
    name:'Test async',
    async test (args: any) { // Or return a Promise object
        await timeout(2000);
        console.log(args, this.args);
        return [
            11
        ];
    },
    expect: [
        11
    ]
};

module.exports = asyncCase;
```

Run test cases

```js
const {startTest} = require('easy-test-lib');
const testAsync = require('./test-async');

startTest({
    cases: [
        testAsync
    ],
    onTestComplete (result) {
        console.log(`Total time (${result.time}) ms; result: ${result.passed?'Passed':'Failed'}`);
        console.log(result);
    },
    onTestSingle (result) {
        console.log(`${result.index}: Time-consuming (${result.time}) ms; Result: ${result.passed?'Passed':'Failed'}`);
    }
});
```

#### 4.2 Custom plugin

easy-test-lib supports custom plugins, which are handed over to the developer to customize the test calculation process. A simple custom plugin template is as follows

```js
const plugin: ITestPlugin = (item, mergedArgs) => {
    
    // do something ...

    return {
        result: {},
        expect: {},
        passed: true,
    };
};

export default plugin;
```

### 5 API

#### 5.1 startTest

See above 3

#### 5.2 isValueEqual

Determine whether two objects are equal, support reference types

The reference type will traverse whether all the attribute values are equal

```js
const {isValueEqual} = require('easy-test-lib');
console.log(isValueEqual(1, 1));
```

#### 5.3 defaultPlugin

Default plugin

#### 5.4 ts interface

1. ITestConfigItem
2. ITestPlugin
3. IStartTest
4. IIsValueEqual
5. IMergedArgs