const info          = require('./package.json')
const Metalsmith    = require('./lib')
const elemeno       = require('./modules/metalsmith-elemeno')
const sass          = require('metalsmith-sass')
const concat        = require('metalsmith-concat')
const contentMenu   = require('./modules/metalsmith-content-menu')
const markdown      = require('metalsmith-markdown')
const layouts       = require('./modules/metalsmith-layouts-222/index')
const moveUp        = require('metalsmith-move-up')
var dev = process.argv[2] || false
if (dev) {
  dev        = require("metalsmith-dev")
  var dotenv = require('dotenv')
  dotenv.load()
}

var site = Metalsmith(__dirname)
  .metadata({
    mainTitle: info.name,
    generator: "Metalsmith",
    url: info.homepage
  })
  .source('./src')
  .destination('./build')

// Break the chain, so "site" is defined before dev tasks access it below

site.ignore([
    '.*',  //ignore hidden files like .eslintrc
    'layouts',
  ])
  .clean(true)
  .use(elemeno(process.env.ELEMENO_API_TOKEN))
  .use(sass({
    sourceMap: true,
    sourceMapContents: true,
    outputDir: function(originalPath) {
      // this will change scss/some/path to css/some/path
      return originalPath.replace("style", "assets")
    }
  }))
  .use(concat({
    files: [
      'tags/**/*.tag.html',
      'js/riot-setup.js',
      'js/**/*.js'
    ],
    output: 'assets/main.tag.js'
  }))
  .use(markdown())
  .use(contentMenu({
    folder: 'content',
    //fileType: '.html',
    indexKey: 'position',
    orderBy: 'date',
    ascOrDesc: 'desc'
  }))
  .use(layouts({
    engine: 'pug',
    directory: './src/layouts',
    layoutExtension: '.pug', //custom
    pattern: 'content/**/*.html'
  }))
  .use(moveUp('content/**'))
  //.use(debug())
  .build(function(err) {
    if (err) { throw err }
  })

if (dev) {
  dev.watch(site)
  dev.serve(site)
}

// function debug() {
//   return function(files, metalsmith, done) {
//     Object.keys(files).forEach(function(file){
//       console.log('##', file)
//       //var data = files[file]
//     })
//
//     console.log(metalsmith.metadata())
//     done()
//   }
// }
