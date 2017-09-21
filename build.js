const info          = require('./package.json')
const Metalsmith    = require('./lib')
const elemeno       = require('./modules/metalsmith-elemeno')
const sass          = require('metalsmith-sass')
const postcss       = require('metalsmith-with-postcss')
const concat        = require('metalsmith-concat')
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
    '.*'  //ignore hidden files like .eslintrc
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
  .use(postcss({
    pattern: ['**/*.css', '!**/_*/*', '!**/_*'],
    plugins: {
      'autoprefixer': {}
    }
  })) 
  .use(concat({
    files: 'tags/**/*.tag.html',
    output: 'assets/all.tag.js'
  }))
  .use(concat({
    files: [
      'js/app.js',
      'js/**/*.js'
    ],
    output: 'assets/main.js'
  }))
  .build(function(err) {
    if (err) { throw err }
  })

if (dev) {
  dev.watch(site)
  dev.serve(site)
}

// function debug() {
//   return function(files, metalsmith, done) {
//     console.log('### DEBUG ###')
//     console.log(files)
//     Object.keys(files).forEach(function(file){
//       console.log('##', file)
//       //var data = files[file]
//     })
//
//     console.log(metalsmith.metadata())
//     console.log('### DEBUG END ###')
//     done()
//   }
// }
