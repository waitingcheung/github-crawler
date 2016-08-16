var util = require('./utility');
var crawler = require('./crawler');
var rateLimit = crawler.rateLimit;

var argv = require('minimist')(process.argv.slice(2), {
    string: 'user',
    string: 'repo',
    string: 'state',
    string: 'per_page',
    string: 'labels',
    string: 'page',
    string: 'max_page',
    string: 'out',
    default: {
        state: 'closed',
        per_page: 100,
        page: 1,
        max_page: 1,
        out: 'issues'
    }
});

if (!argv.user || !argv.repo) {
    util.help();
    return;
}

console.log(argv._);
if (argv._.indexOf('verbose') > -1) {
	console.log('hello');
	util.verbose = true;
}

console.log('Collecting issues from ' + argv.user + '/' + argv.repo);

var page = 1;

(function collectIssues() {
    if (page <= argv.max_page) {
        crawler.getIssuesForRepo(argv, page, function() {
            page++;
            setTimeout(collectIssues, rateLimit);
        });
    } else {
        crawler.getCommentsForAllIssues(argv);
    }
})();
