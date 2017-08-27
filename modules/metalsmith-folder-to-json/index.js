var fs = require('fs')
var path = require('path')

var metalsmith_plugin = function (opts) {
  var dir = opts.folder
  var key = opts.nameInMetadata || 'folderTree'
  var baseDir = path.resolve('', dir)

  return function (files, metalsmith, done) {
    var metadata = metalsmith.metadata()

    //https://stackoverflow.com/a/31831122/3313410
    var directoryTreeToObj = function(dir, done) {
      var results = []

      fs.readdir(dir, function(err, list) {
        if (err)
          return done(err)

        var pending = list.length

        if (!pending)
          return done(null, {
            name: path.basename(dir),
            type: 'folder',
            children: results}
          )

        list.forEach(function(file) {
          file = path.resolve(dir, file)
          fs.stat(file, function(err, stat) {
            if (stat && stat.isDirectory()) {
              directoryTreeToObj(file, function(err, res) {
                results.push({
                  name: path.basename(file),
                  type: 'folder',
                  children: res
                })
                if (!--pending)
                  done(null, results)
              })
            }
            else {
              results.push({
                type: 'file',
                name: path.basename(file),
                path: file.replace(baseDir, '')
              })
              if (!--pending)
                done(null, results)
            }
          })
        })
      })
    }

    directoryTreeToObj(dir, function(err, res){
      if(err) return done(err)
      metadata[key] = res
      metalsmith.metadata(metadata)
      done()
    })
  }
}

// Expose the plugin
module.exports = metalsmith_plugin
