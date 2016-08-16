var testrunner = require("qunit");
var a = require('assert');

testrunner.options.coverage = true;

testrunner.run({
    code: "crawler.js",
    tests: "test/all.js"
}, function(err, res) {
    if (err) {
        console.error(err);
    }
});