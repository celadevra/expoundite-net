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
    prismjs = require('metalsmith-prismjs'),
    feed = require('metalsmith-feed')

var md = markdown('default', {html: true}),
    footnote = require('markdown-it-footnote'),
    attrs = require('markdown-it-attrs')

md.parser.use(footnote)
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
	sitename: '徐栖 - 读写科幻',
	author: '徐栖',
	site: {
	    title: '徐栖 - 读写科幻',
	    url: 'https://expoundite.net'
	}
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
	    pattern: "links/*.md",
	    sortBy: "date",
	    reverse: true
	}}))
    .use(md)
    .use(permalink({
	relative: false,
	pattern: ':title',
	linksets: [{
	    match: { collection: 'blog' },
	    pattern: 'blog/:date/:alttitle'
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
    .use(feed({
	collection: 'blog'
    }))
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

var style = new Metalsmith(__dirname)
    .source('./src/fonts/')
    .destination('./build/assets/fonts')
    .build(err)
