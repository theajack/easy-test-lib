/*
 * @Author: chenzhongsheng
 * @Date: 2022-06-02 07:29:17
 * @Description: Coding something
 */

import {ITestConfigItem} from '../../src';

const config: ITestConfigItem = {
    name: '测试dom',
    test () {
        const app = window.document.getElementById('app') as HTMLElement;
        app.innerHTML = '<span>你好</span>';
        return app.innerText;
    },
    expect: '你好'
};
export default config;