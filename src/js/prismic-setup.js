/*
PRISMIC CONTENT SETUP
*/
app.config.endpoint = 'https://breaker222portfolio.prismic.io/api/v2'//TODO get from config
app.config.ref = ''
app.config.allDocumentsApi = '/documents/search?'
var rawContent = {}
var content = null

function load(url, callback) {
  var ajax = new XMLHttpRequest()

  ajax.onreadystatechange = function() {
    if (ajax.readyState === XMLHttpRequest.DONE) {
      if (ajax.status === 200) {
        var result = JSON.parse(ajax.responseText)
        return callback(result)
      } else {
        console.error('there was an error: ' + ajax.status)
        return null
      }
    }
  }

  ajax.open('GET', url, true)
  ajax.send()
}

function getRef (data) {
  data.refs.forEach(function (currentRef) {
    if (currentRef.isMasterRef) {
      app.configig.ref = currentRef.ref
      app.trigger(app.evt.refReady)
    }
  })
}

function updateContent (data) {
  rawContent = data
  console.log(rawContent)

  content = PrismicDOM.RichText.asHtml(rawContent.results[0].data.text)
  console.log(content)

  app.trigger(app.evt.contentReady)
  riot.update()
}

function loadAllContent () {
  if (!app.config.ref.length) {
    load(app.config.endpoint, getRef)
    app.one(app.evt.refReady,
      loadAllContent)
    return
  }

  load(app.config.endpoint + app.config.allDocumentsApi + 'ref=' + app.config.ref,
    updateContent)
}

function rawContentToHtml (raw) {

}


/*
RUN
*/
// loadAllContent()
