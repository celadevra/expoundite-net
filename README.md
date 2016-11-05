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
$ npm clean
# actual build
$ npm build
```

## Deploy

Currently I am paying for a server, which is (still) the most reasonably way to
have a custom domain and Let's Encrypt certificates. When these problems are
solved I'd like to jump onto the serverless bandwagon.

Therefore at the moment I just use rsync to transfer files to the server.

