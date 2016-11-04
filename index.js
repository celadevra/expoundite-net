// Dependencies
var Metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdownit'),
    layouts = require('metalsmith-layouts'),
    collection = require('metalsmith-collections'),
    permalink = require('metalsmith-permalinks'),
    ignore = require('metalsmith-ignore'),
    less = require('metalsmith-less'),
    dateFormatter = require('metalsmith-date-formatter'),
    pagination = require('metalsmith-pagination'),
    tags = require('metalsmith-tags'),
    prismjs = require('metalsmith-prismjs')

var md = markdown('default', {html: true}),
    footnote = require('markdown-it-footnote'),
    sub = require('markdown-it-sub-alt'),
    sup = require('markdown-it-sup-alt'),
    attrs = require('markdown-it-attrs')

md.parser.use(footnote)
    .use(sup)
    .use(sub)
    .use(attrs)

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
	    pattern: ':alttitle'
	}]}))
    .use(dateFormatter({
	dates: [
	    {
		key: "date",
		format: "YYYY/MM/DD"
	    }
	]}))
    .use(pagination({
	'collections.blog': {
	    template: 'blog-index.mustache',
	    path:'blog-index/:page/index.html',
	    pageMetadata: {
		title: '博客'}}}))
    .use(tags({
	handle: 'tags',
	path: 'topics/:tag/index.html',
	layout: 'topic.mustache',
	sortBy: 'date',
	reverse: true}))
    .use(prismjs())
    .use(layouts(layoutOptions))
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
