// Dependencies
var Metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown-it'),
    layouts = require('metalsmith-layouts'),
    collection = require('metalsmith-collections'),
    permalink = require('metalsmith-permalinks')

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
    .use(collection({
	pages: {
	    pattern: "content/pages/*.md"
	},
	blog: {
	    pattern: "content/blog/*.md",
	    sortBy: "date",
	    reverse: true
	},
	reviews: {
	    pattern: "content/reviews/*.md"
	},
	links: {
	    pattern: "content/links/*.md"
	}}))
    .use(markdown())
    .use(layouts(layoutOptions))
    .use(permalink({
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
