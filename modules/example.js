// Include debug to help with debugging.
var debug = require('debug')('metalsmith-name-of-my-plugin')

var metalsmith_plugin = function (opts) {

    // Initialise plugin with options.
    // The plugin could need an instance of a library to process the data.

    return function (files, metalsmith, done) {

        // Metalsmith metadata usage:
        var metadata = metalsmith.metadata()

        // Loop through files
        Object.keys(files).forEach(function(file){
            debug('checking file: %s', file)
            //var file_data = files[file]
            console.log('##', file)
        })

        // Errors should be reported if necessary
        /*
        if (has_issue) {
            done(new Error('Explain the issue'))
        }
        */

        console.log('It works :) This is your metadata:', metadata)
        if (opts) console.log('…and these are the given options', opts)

        // Call done() to tell Metalsmith it has finished.
        // This allows us to work asynchronously and call it when we are done.
        done()
    }
}

// Expose the plugin
module.exports = metalsmith_plugin
