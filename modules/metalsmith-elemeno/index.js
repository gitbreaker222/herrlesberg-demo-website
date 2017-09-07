
var Elemeno = require('elemeno')
const _ = require('lodash')

var metalsmith_elemeno = function (apiToken) {
  // Initialise plugin with options.
  // The plugin could need an instance of a library to process the data.

  return function (files, metalsmith, done) {
    var options = {
        cacheMaxAge: 2, // minutes
        cacheSize: 50 // megabytes
    }
    var elemeno = new Elemeno(apiToken, options)
    var folder = 'content' //TODO with opts
    var collectionName = null
    var description = ''
    var content = ''
    var asyncCounter = 0

    /*
       # METADATA
    */
    asyncCounter++
    elemeno.getSingle('meta')
    .then(function(response) {
      asyncCounter--
      var meta = response.data.content
      meta = _.merge(metalsmith.metadata(), meta)
      metalsmith.metadata(meta)
      if (!asyncCounter) done()
    }, function(error) {
      done(new Error(error))
    })

    asyncCounter++
    elemeno.getCollectionItems('pages')
    .then(function(response) {
      asyncCounter--
      /*
         # PAGES
      */
      response.data.forEach((page) => {
        collectionName = page.content.collection

        // first page should be index.html
        if (page.content.position.number === 1) page.slug = 'index'
        // for some reason skript freezes when try to acces markdown of undefined
        if (page.content.description) description = page.content.description.markdown
        if (page.content.content) {
          content = page.content.content.markdown
        } else {
          content = ''
        }

        if (collectionName) {
          /*
             ## COLLECTION OVERVIEW PAGE
          */
          files[`${folder}/${page.slug}.md`] = {
            layout: 'list',
            title: page.title,
            slug: page.slug,
            description: description,
            position: page.content.position.number,
            image: page.content.image,
            collection: collectionName,
            contents: content
          }

          //… and folder for the collection
          asyncCounter++
          elemeno.getCollectionItems(collectionName)
          .then(function(response) {
            asyncCounter--
            var collection = response.data
            var subfolder = `${folder}/${page.slug}`
            /*
            === COLLECTIONS ===
            */
            collection.forEach((item) => {
              if (item.content.description) description = item.content.description.markdown
              if (item.content.content) content = item.content.content.markdown

              files[`${subfolder}/${item.slug}.md`] = {
                layout: 'post',
                title: item.title,
                slug: item.slug,
                description: description,
                date: item.content.date,
                image: item.content.image,
                contents: content
              }
            })

            if (!asyncCounter) done()
          }, function(error) {
            done(new Error(error))
          })
        } else {
          /*
             ## NORMAL PAGE
          */
          files[`${folder}/${page.slug}.md`] = {
            layout: 'layout',
            title: page.title,
            slug: page.slug,
            description: description,
            position: page.content.position.number,
            image: page.content.image,
            contents: content
          }

        }
      })

      if (!asyncCounter) done()
    }, function(error) {
      done(new Error(error))
    })
  }
}

// Expose the plugin
module.exports = metalsmith_elemeno
