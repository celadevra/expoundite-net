// Dependencies
var Metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown-it'),
    layouts = require('metalsmith-layouts')

// default callback on errors
var err = function (err) { if(err) console.log(err) }

// metalsmith-layouts options
var layoutOptions = {
    engine: "mustache",
    default:"default.mustache",
    directory:"templates",
    partials:"templates/partials"
}

Metalsmith(__dirname)
    .use(markdown())
    .use(layouts(layoutOptions))
    .destination('./build')
    .build(err)
