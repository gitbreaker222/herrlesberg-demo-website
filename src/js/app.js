/*
APP SETUP
*/
var app = {}
app.data = {
  meta: {},
  content: [],
  currentPage: null //object
}
app.services = {}
app.ctrl = {}
riot.observable(app)

// EVENT NAMES (prevent confusion)
app.evt = {
  init: 'init',
  appReady: 'appReade',
  contentLoaded: 'contentLoaded',
  contentReady: 'contentReady',
  pageChange: 'pageChange',
  error: 'error'
}

// ROUTES
route(function(pageName, subPageName) {
  function getPageIndex (collection, slug) {
    return collection.findIndex(function (page) {
      return page.slug === slug
    })
  }
  function assignPage (page) {
    app.data.currentPage = page
    app.trigger(app.evt.pageChange)
    riot.update()
  }

  var page
  var index = getPageIndex(app.data.content, pageName)
  if (index >= 0) {
    page = app.data.content[index]
    if (subPageName && page.collection) {
      subPageName = pageName + '/' + subPageName
      index = getPageIndex(page.children, subPageName)
      if (index >= 0) {
        page = page.children[index]
        return assignPage(page)
      }
    } else {
      return assignPage(page)
    }
  }

  //not found -> TODO 404
  route('/#')
})
route('/', function () {
  if (!app.data.content.length) return
  app.data.currentPage = app.data.content[0]
  app.trigger(app.evt.pageChange)
  riot.update()
})

// INIT
app.one(app.evt.init, function () {
  riot.mount('*')
})
//wait for app.tag.html to be mounted
app.one(app.evt.appReady, function () {
  //load content - prepare
  var url = '/content.json'
  app.one(app.evt.contentLoaded, function (data) {
    data =  JSON.parse(data)
    app.data.meta = data.meta
    app.data.content = data.pages
    route.start(true)
    app.trigger(app.evt.contentReady)
  })
  //execute
  app.load(url, app.evt.contentLoaded)
})
