const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const RunNodeWebpackPlugin = require('run-node-webpack-plugin');

module.exports = () => {
    return {
        mode: 'production',
        entry: path.resolve('./', 'src/index.ts'),
        output: {
            path: path.resolve('./', 'npm'),
            filename: 'easy-test-lib.min.js',
            library: 'ETest',
            libraryTarget: 'umd',
            libraryExport: 'default',
            globalObject: 'this',
        },
        resolve: {
            extensions: [ '.tsx', '.ts', '.js' ]
        },
        externals: {},
        module: {
            rules: [{
                test: /(.ts)$/,
                use: {
                    loader: 'ts-loader'
                }
            }, {
                test: /(.js)$/,
                use: [{
                    loader: 'babel-loader',
                }]
            }, {
                test: /(.js)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                exclude: /node_modules/,
                options: {
                    configFile: './.eslintrc.js'
                }
            }]
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {from: 'src/index.d.ts', to: 'easy-test-lib.min.d.ts'},
                    {from: 'src/type.d.ts'},
                    {from: 'README.md'},
                    {from: 'LICENSE'}
                ]
            }),
            new RunNodeWebpackPlugin({scriptToRun: './helper/sync-npm-version.js'})
        ]
    };
};