window.jsboxCode = {
    lib: 'https://cdn.jsdelivr.net/npm/easy-test-lib/easy-test-lib.min.js',
    code: /* javascript*/`function add(x, y){
    return x + y;
}
ETest.startTest({
    args: { // 可选参数
        // 用于传入一些公用的api，会被传入测试用例中
    },
    cases: [ // 测试用例配置，建议拆分文件
        {
            name: '测试add函数', // 可选
            args: { // 可选
                // 当前测试用例的api
            },
            test (mergedArgs) { 
                // mergedArg 为公共arg和用例arg的合并，除此之外mergedArg 中有 $global 和$local两个属性
                // this指代当前测试用例
                return add(1, 5);
            },
            expect: 6,
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
        console.log(result)
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
        console.log(result)
    },
});`
};
