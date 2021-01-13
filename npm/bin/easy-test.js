#!/usr/bin/env node
const tcTest = require('../easy-test-lib.min.js');
const path = require('path');
function main () {
    const cwd = process.cwd();
    const configFile = path.join(cwd, process.argv[2] || `./easy.test.js`);
    const config = require(configFile);
    tcTest.startTest(config);
};

main();