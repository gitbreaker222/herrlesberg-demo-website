/*
Load an [url] and then trigger the given [eventName]
with riot observer on the global "app" object.
The event contains the result data
*/
app.load = function (url, eventName) {
  var ajax = new XMLHttpRequest()
  ajax.onreadystatechange = function() {
    if (ajax.readyState === XMLHttpRequest.DONE ) {
      if (ajax.status === 200) {
        app.trigger(eventName, ajax.responseText)
      }
      else {
        console.error('ajax error:', ajax.status)
        app.trigger(app.evt.error, ajax.status)
      }
    }
  }
  ajax.open('GET', url, true)
  ajax.send()
}
