## 🚀 一个简单小巧的js测试库

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

**[English](https://github.com/theajack/easy-test-lib/blob/master/README.md) | [反馈错误/缺漏](https://github.com/theajack/easy-test-lib/issues/new) | [Gitee](https://gitee.com/theajack/easy-test-lib)**


### 1. 特性

1. typescript 编写
2. 体积小巧，简单易用
3. 多端支持
4. 支持异步
5. 可自定义插件
6. 配置文件 + 命令行运行
7. 全局安装可用

### 2. 安装

#### 2.1 api调用

```
npm i easy-test-lib -D
```

```js
const {startTest} = require('easy-test-lib');
startTest(config);
```

#### 2.2 配置文件调用

package.json 增加

```
    ...
    "scripts": {
        "test": "etest <config file>"
    },
    ...
```

配置文件默认是根目录的 `easy.test.js` 文件，可以自由配置

根目录执行

```
npm run test
```

#### 2.3 全局安装使用

```
npm i easy-test-lib -g
```

配置文件与2.2中规则一致

在项目目录中运行以下命令行即可

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

### 3 配置

```js
const {startTest} = require('easy-test-lib');

function add (x, y) {
    return x + y;
}

startTest({
    args: { // 可选参数
        // 用于传入一些公用的api，会被传入测试用例中
    },
    cases: [ // 测试用例配置，建议拆分文件
        {
            name: '测试add函数', // 可选
            args: { // 可选
                // 当前测试用例的api
            },
            test (args, localArgs) { 
                // args对应公共api，localArgs对应当前测试用例api
                // this指代当前测试用例
                return add(1, 1);
            },
            expect: 2,
            // plugin: ITestPlugin, // 当前测试用例使用的插件 可选
        }
    ],
    onTestComplete (result) { // 测试全部完成回调 可选
        // result 数据结构如下
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
    onTestSingle (result) { // 单个测试用例完成回调 可选
        // result 数据结构如下
        /*
            passed: boolean;
            result: any;
            expect?: any;
            name?: string;
            index: number;
            time: number;
        */
    },
    // plugin: ITestPlugin, // 全局插件 可选
});
```

### 4 插件

#### 4.1 内置插件

easy-test-lib 内置了 默认插件（defaultPlugin）和 异步插件（asyncPlugin）

默认使用默认插件，如需使用异步插件可以直接使用字符串引入

```js
plugin: 'asyncPlugin'
```

或从 easy-test-lib 中引入

```js
const {asyncPlugin} = require('easy-test-lib');

...
plugin: asyncPlugin
```

以下是一个使用异步插件的测试用例

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
    plugin: 'asyncPlugin',
    name: '测试async',
    async test (args: any) {
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

运行测试用例

```js
const {startTest} = require('easy-test-lib');
const testAsync = require('./test-async');

startTest({
    cases: [
        testAsync
    ],
    onTestComplete (result) {
        console.log(`总耗时（${result.time}）ms； 结果：${result.passed ? '通过' : '失败'}`);
        console.log(result);
    },
    onTestSingle (result) {
        console.log(`${result.index}: 耗时（${result.time}）ms； 结果：${result.passed ? '通过' : '失败'}`);
    }
});
```

#### 4.2 自定义插件

easy-test-lib 支持自定义插件，交给开发者定制测试计算过程，一个简单的自定义插件模板如下


```js
const plugin: ITestPlugin = ({
    name, test, expect, args
}, argsConfig) => {
    
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

参见 上文 3

#### 5.2 isValueEqual

判断两个对象是否相等，支持引用类型

引用类型会遍历其中的所有属性值是否相等

```js
const {isValueEqual} = require('easy-test-lib');
console.log(isValueEqual(1, 1));
```

#### 5.3 defaultPlugin

默认的插件

#### 5.4 defaultPlugin

支持异步的插件

#### 5.5 ts 接口

 1. ITestConfigItem
 2. ITestPlugin
 3. IStartTest
 4. IIsValueEqual