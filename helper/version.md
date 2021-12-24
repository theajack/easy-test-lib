<!--
 * @Author: tackchen
 * @Date: 2021-12-20 14:28:09
 * @LastEditors: tackchen
 * @FilePath: /easy-test-lib/helper/version.md
 * @Description: Coding something
-->

## 更新日志

### 0.0.1-0.0.2

1. typescript 编写
2. 体积小巧，简单易用
3. 多端支持
4. 支持异步
5. 可自定义插件
6. 配置文件 + 命令行运行
7. 全局安装可用

### 1.0.0

1. 对参数进行合并
2. 支持Date、DOM、RegExp等对象的Equal比较，优化equal算法
3. 支持test直接配置返回数据
4. 支持expect配置一个函数作为返回值
5. 增加 IMergedArgs 接口, 主要用于自定义第三方插件时使用

### 1.0.1

1. 删除 asyncPlugin, 合并到defaultPlugin
2. 增加 diaabled 参数，可以动态控制禁用某些测试用例
