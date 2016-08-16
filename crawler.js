var fs = require('fs-extra');
var GitHubApi = require('github');
var util = require('./utility');
var testAuth = util.getAuth();

var rateLimit = 1000; // ms

var github = new GitHubApi({
    debug: false,
    headers: {
        "Accept": "application/vnd.github.squirrel-girl-preview"
    }
});

github.authenticate({
    type: "oauth",
    token: testAuth["token"]
});

function getIssuesForRepo(argv, pageNumber, callback) {
    util.verboseLog('Collecting issues from page ' + pageNumber);

    var dir = argv.out;
    fs.mkdirsSync(dir);

    var repoRoot = argv.out + '/' + argv.user + '_' + argv.repo;
    fs.mkdirsSync(repoRoot);

    github.issues.getForRepo({
        user: argv.user,
        repo: argv.repo,
        state: argv.state,
        per_page: argv.per_page,
        labels: argv.labels || '',
        page: pageNumber
    }, function(err, res) {
        if (err) {
            console.error(err.toJSON());
        } else {
            var file = repoRoot + '/pages/' + pageNumber + '.json';
            fs.mkdirsSync(repoRoot + '/pages');
            fs.writeJson(file, res, {
                spaces: 4
            }, function(err) {
                if (err) {
                    console.error(err);
                } else {
                    callback(res);
                }
            });
        }
    });
}

function getCommentsForIssue(argv, issueNumber, callback) {
    util.verboseLog('Collecting issue ' + issueNumber);

    var repoRoot = argv.out + '/' + argv.user + '_' + argv.repo;

    if (typeof issueNumber !== 'number') {
        return;
    }

    github.issues.getComments({
        user: argv.user,
        repo: argv.repo,
        number: issueNumber,
        page: 1,
        per_page: 100
    }, function(err, res) {
        if (err) {
            console.log(err.toJSON());
        } else {
            fs.mkdirsSync(repoRoot + '/' + argv.labels);
            var file = repoRoot + '/' + argv.labels + '/' + issueNumber + '.json';
            fs.writeJson(file, res, {
                spaces: 4
            }, function(err) {
                if (err) {
                    console.error(err);
                } else {
                    callback(res);
                }
            });
        }
    });
}

function getCommentsForAllIssues(argv, callback) {
    var repoRoot = argv.out + '/' + argv.user + '_' + argv.repo;
    var issueRoot = repoRoot + '/pages';

    // Collect issue numbers from JSON of each page
    var issueQueue = [];
    var files = fs.readdirSync(issueRoot);
    
    for (var f in files) {
        var obj = fs.readJsonSync(issueRoot + '/' + files[f], {
            throws: false
        });

        for (var o in obj) {
            issueQueue.push(obj[o].number);
        }
    }

    // Get comments from each issue
    (function getComment() {
        if (issueQueue.length > 0) {
            getCommentsForIssue(argv, issueQueue.shift(), function() {
                setTimeout(getComment, rateLimit);
            });
        }
    })();

    if (typeof callback === 'function') {
        callback();
    }
}

module.exports = {
    getIssuesForRepo: getIssuesForRepo,
    getCommentsForIssue,
    getCommentsForIssue,
    getCommentsForAllIssues: getCommentsForAllIssues,
    rateLimit: rateLimit
}
