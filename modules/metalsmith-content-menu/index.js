// Include debug to help with debugging.
//var debug = require('debug')('metalsmith-content-menu')
var _     = require("lodash")

var metalsmith_plugin = function (opts) {
  //console.log('options:',opts)
  var folder      = opts.folder || ''
  var fileType    = opts.fileType || ''
  var orderKey    = opts.orderBy || 'title'
  var indexKey    = opts.indexKey || 'menuIndex'
  var ascOrDesc   = opts.ascOrDesc || 'asc'
  var hideKey    = opts.hideKey || 'hideInMenu'


  return function (files, metalsmith, done) {
    var metadata = metalsmith.metadata()
    var collection = []
    var currentFolder = null
    var contentMenu = {
      type: 'menu',
      baseUrl: '/',
      children: []
    }

    var getfolderPath = function (path) {
      //matches e.g. "posts/2020" in "/posts/2020/peace.html"
      var result = path.match(/[^/\n].+(?=[/])/)
      if (result) return result[0]
      return ''
    }

    // filter for matching files
    // and transform files object to collection
    _.keys(files).forEach(function (filePath) {
      var path        = filePath.replace(folder, '')
      var folderPath  = getfolderPath(path)
      var fileData    = files[filePath]

      //filter filestream
      if (fileData[hideKey]) return
      if (!filePath.startsWith(folder)) return
      if (!filePath.endsWith(fileType)) return

      var  item = _.clone(fileData)
      //child.title    = fileData.title || path
      //child.description = fileData.description
      item.path = path
      item.folderPath = folderPath
      delete item.mode
      delete item.stats

      collection.push(item)
    })

    //sort files
    collection = _.orderBy(
      collection,
      ['folderPath', indexKey, orderKey],
      ['asc', 'asc', ascOrDesc]
    )

    function itemGrouping (item) {
      currentFolder = contentMenu
      if (item.folderPath.length) currentFolderDeeper(item)
      currentFolder.children.push(item)
    }
    function currentFolderDeeper (item) {
      _.forEach(item.folderPath.split('/'), function (part) {
        function folderExists (name) {
          return !!currentFolder[name]
        }
        function createThatFolderHere (name, folder) {
          folder[name] = {
            type: 'menu',
            baseUrl: currentFolder.baseUrl + name + '/',
            children: []
          }
        }

        if (!folderExists(part)) {
          createThatFolderHere(part, currentFolder)
        }
        currentFolder = currentFolder[part]
      })
    }

    _.forEach(collection, itemGrouping)

    metadata.contentMenu = contentMenu
    metalsmith.metadata(metadata)

    // Errors should be reported if necessary
    /*
    if (has_issue) {
        done(new Error('Explain the issue'))
    }
    */

    done()
  }
}

module.exports = metalsmith_plugin
