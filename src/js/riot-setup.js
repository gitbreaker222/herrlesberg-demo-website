/*
RIOT SETUP
*/
var app = {}
riot.observable(app)
// event names
app.evt = { //TODO cleanup
  refReady: 'refReady',
  contentReady: 'contentReady'
}
// configuration
app.config = {}
