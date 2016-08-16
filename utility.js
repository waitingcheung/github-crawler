var fs = require('fs-extra');
var verbose = false;

function getAuth() {
    try {
        var auth = require("./testAuth.json");
        return auth;
    } catch (e) {
        return {
            "token": process.env.token
        }
    }
}

function verboseLog(msg) {
    if (verbose) {
        console.log(msg);
    }
}

function help() {
    console.log('node index.js [options]');
    console.log('Options');
    console.log('\t--user=User');
    console.log('\t--repo=Repo');
    console.log('\t--state=[open | closed | all]');
    console.log('\t--per_page=Number');
    console.log('\t--labels=Labels');
    console.log('\t--page=Number');
    console.log('\t--max_page=Number');
    console.log('\t--out=Directory');
    console.log('\tverbose');
}

module.exports = {
    getAuth: getAuth,
    verbose: verbose,
    verboseLog: verboseLog,
    help: help
}
