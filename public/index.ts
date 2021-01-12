

import startTest from '../src/index';

startTest({
    args: {
        aa: '11'
    },
    config: [
        {
            name: '测试spell',
            test (args) {
                console.log(args);
                return [
                    11
                ];
            },
            expect: [
                11
            ]
        }
    ],
    onTestComplete (results) {
        console.log(results);
    },
    onTestSingle (result) {
        console.log(result);
    }
});