// Dependencies
var Metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdownit'),
    layouts = require('metalsmith-layouts'),
    collection = require('metalsmith-collections'),
    permalink = require('metalsmith-permalinks'),
    ignore = require('metalsmith-ignore'),
    less = require('metalsmith-less')

var md = markdown('default'),
    footnote = require('markdown-it-footnote')
md.parser.use(footnote)

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
    .use(md)
    .use(layouts(layoutOptions))
    .use(permalink({
	relative: false,
	pattern: ':title',
	linksets: [{
	    match: { collection: 'blog' },
	    pattern: 'blog/:date/:title'
	},{
	    match: { collection: 'reviews' },
	    pattern: 'reviews/:alttitle'
	},{
	    match: { collection: 'links' },
	    pattern: 'links/:title'
	},{
	    match: { collection: 'pages' },
	    pattern: ':alttitle'}]}))
    .destination('./build')
    .build(err)

var style = new Metalsmith(__dirname)
    .source('./src/styles/')
    .destination('./build/assets/css')
    .use(less())
    .build(err)

var scripts = new Metalsmith(__dirname)
    .source('./src/scripts/')
    .destination('./build/assets/js')
    .build(err)
