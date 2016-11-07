# EXPOUNDITE.NET

https://expoundite.net

Source code used to generate contents for expoundite.net. The site focuses on
writing and reviewing speculative fictions and fictions in general.

## Set up

The site is built with [Metalsmith](http://metalsmith.io). A working Node.js and
NPM setup is required before building.

``` shell
# After cloning the repo
$ cd expoundite-net
$ npm install
```

## Build

``` shell
# (optional)
$ npm run clean
# actual build
$ npm run build
```

## Deploy

Each commit is submitted to Circle CI to build, which then send the result to
Amazon S3 for storage. S3 also serves as the backend of a CloudFront
distribution. So, each time I edit and submit something, it will appear on the
webpage in 10~15 minutes, pretty cool, huh?

You will need to use your own S3 credentials if you clone the repo and want to
host it yourself. The `circle.yml` file can be used as a starting point.
