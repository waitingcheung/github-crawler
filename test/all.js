var fs = require('fs');

test('Get issues for repo', function() {
    stop();
    setTimeout(function() {
        var argv = {
            user: 'jquery',
            repo: 'jquery',
            state: 'closed',
            per_page: 2,
            labels: 'Bug',
            page: 1,
            out: 'test/issues'
        };

        getIssuesForRepo(argv, argv.page, function(json) {
            if (Array.isArray(json) && json.length == 2) {
                ok(true, "Get issues successfully");
            } else {
                ok(false, "Failed to get issues");
            }
            start();
        });
    }, 100);
});

test('Get comments for issue', function() {
    stop();
    setTimeout(function() {
        var argv = {
            user: 'jquery',
            repo: 'jquery',
            state: 'closed',
            per_page: 1,
            labels: 'Bug',
            page: 1,
            out: 'test/issues'
        };

        getCommentsForIssue(argv, 3139, function(json) {
            if (Array.isArray(json)) {
                ok(true, "Get comments successfully");
            } else {
                ok(false, "Failed to get comments");
            }
            start();
        });
    }, 100);
});

test('Get comments for all issues', function() {
    stop();
    setTimeout(function() {
        var argv = {
            user: 'jquery',
            repo: 'jquery',
            state: 'closed',
            per_page: 1,
            labels: 'Bug',
            page: 1,
            out: 'test/issues'
        };

        getCommentsForAllIssues(argv, function() {
            ok(true, "Get all comments successfully");
            start();
        });
    }, 100);
});
