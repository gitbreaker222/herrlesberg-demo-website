
var Elemeno = require('elemeno')
const _ = require('lodash')

var metalsmith_elemeno = function (opts) {
  var apiToken
  if (typeof opts === 'string') {
    apiToken = opts
  } else {
    apiToken = opts.apiToken
  }
  opts.cacheMaxAge = opts.cacheMaxAge || 2 // minutes
  opts.cacheSize = opts.cacheSize || 50 // megabytes

  return function (files, metalsmith, done) {
    var elemeno = new Elemeno(apiToken, opts)
    var meta
    var pages
    var path = ''
    var asyncCounter = 0

    // higher order / helper functions
    var parse = function (collection, templateName) {
      collection = _.map(collection, function (item) {
        item.content.slug = path + item.slug
        item = item.content //extract from the 'content' wrapper
        if (item.description){
          item.description = item.description.html
        }
        if (item.position) {
          item.position = item.position.number
        }
        if (item.content){
          item.content = item.content.html //the actual content field
        }
        item.template = templateName
        item.children = []

        if (item.collection) {
          /*
            ## CREATE LIST-VIEW PAGE AND ALL ITEMS
          */
          asyncCounter++
          elemeno.getCollectionItems(item.collection)
          .then(function(response) {
            asyncCounter--

            path = item.slug + '/' 
            var collection = response.data
            collection = parse(collection, 'post')
            collection = sort(collection)
            item.children = collection
            if (!asyncCounter) finish()
          }, function(error) {
            done(new Error(error))
          })
        }

        return item
      })
      return collection
    }
    var sort = function (collection) {
      return _.orderBy(
        collection,
        ['position', 'date', 'title'], //TODO could make keys variable
        ['asc', 'desc', 'asc']
      )
    }
    var finish = function () {
      files['content.json'] = {
        contents: JSON.stringify({
          meta: meta,
          pages: pages
        })
      }
      done()
    }

    /*
      # GET METADATA
    */
    asyncCounter++
    elemeno.getSingle('meta')
    .then(function(response) {
      asyncCounter--

      meta = response.data.content
      meta = _.merge(metalsmith.metadata(), meta)
      metalsmith.metadata(meta)

      if (!asyncCounter) finish()
    }, function(error) {
      done(new Error(error))
    })

    /*
      # GET PAGES
    */
    asyncCounter++
    elemeno.getCollectionItems('pages')
    .then(function(response) {
      asyncCounter--

      pages = response.data
      pages = parse(pages, 'page')
      pages = sort(pages)

      if (!asyncCounter) finish()
    }, function(error) {
      done(new Error(error))
    })
  }
}

// Expose the plugin
module.exports = metalsmith_elemeno
