var Metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown-it'),
    templates = require('metalsmith-templates')

var err = function (err) { if(err) console.log(err) }

Metalsmith(__dirname)
    .use(markdown())
    .destination('./build')
    .build(err)
