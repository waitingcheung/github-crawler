# github-crawler
A GitHub crawler for collecting issues

[![Build Status](https://travis-ci.org/waitingcheung/github-crawler.svg?branch=master)](https://travis-ci.org/waitingcheung/github-crawler)
[![codecov](https://codecov.io/gh/waitingcheung/github-crawler/branch/master/graph/badge.svg)](https://codecov.io/gh/waitingcheung/github-crawler)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/waitingcheung/github-crawler/blob/master/LICENSE)

## Installation
```
npm install
touch testAuth.json
```

In ``testAuth.json``, input the following:
```
{
  "token": YOUR_GITHUB_OAUTH_TOKEN
}
```

## Usage

This project uses the [Node.js wrapper for GitHub API](https://github.com/mikedeboer/node-github) and the formats of parameters follow those of [issues.getForRepo](https://mikedeboer.github.io/node-github/#api-issues-getForRepo) of the API. For default parameters please refer to [index.js](https://github.com/waitingcheung/github-crawler/blob/master/index.js#L14).

```
node index.js [options]
Options
	--user=User
	--repo=Repo
	--state=[open | closed | all]
	--per_page=Number
	--labels=Labels
	--page=Number
	--max_page=Number
	--out=Directory
```

## Example
```
node index.js --user="jquery" --repo="jquery" --labels="Bug"
```

## Testing
```
npm test
```
