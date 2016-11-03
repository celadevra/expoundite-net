// Dependencies
var Metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown-it'),
    layouts = require('metalsmith-layouts'),
    collection = require('metalsmith-collections'),
    permalink = require('metalsmith-permalinks'),
    ignore = require('metalsmith-ignore'),
    less = require('metalsmith-less')

// default callback on errors
var err = function (err) { if(err) console.log(err) }

// metalsmith-layouts options
var layoutOptions = {
    engine: "mustache",
    default:"default.mustache",
    directory:"templates",
    partials:"templates/partials"
}

var metalsmith = new Metalsmith(__dirname)
    .metadata({
	author: '徐栖'
    })
    .use(ignore('styles/*'))
    .use(collection({
	pages: {
	    pattern: "pages/*.md"
	},
	blog: {
	    pattern: "blog/*.md",
	    sortBy: "date",
	    reverse: true
	},
	reviews: {
	    pattern: "reviews/*.md"
	},
	links: {
	    pattern: "links/*.md"
	}}))
    .use(markdown())
    .use(layouts(layoutOptions))
    .use(permalink({
	relative: false,
	pattern: ':title',
	linksets: [{
	    match: { collection: 'blog' },
	    pattern: 'blog/:date/:title'
	},{
	    match: { collection: 'reviews' },
	    pattern: 'reviews/:title'
	},{
	    match: { collection: 'links' },
	    pattern: 'links/:title'
	},{
	    match: { collection: 'pages' },
	    pattern: ':title'}]}))
    .destination('./build')
    .build(err)

var style = new Metalsmith(__dirname)
    .source('./src/styles/')
    .destination('./build/assets/css')
    .clean(false)
    .use(less())
    .build(err)
