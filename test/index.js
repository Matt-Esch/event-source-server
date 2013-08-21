var test = require("tape")
var setTimeout = require("timers").setTimeout
var clearTimeout = require("timers").clearTimeout

var window = require("global/window")

test("EventSource is defined", function (t) {
    t.ok(window.EventSource)
    t.end()
})

test("EventSource can connect", function (t) {
    var es = new window.EventSource("http://localhost:53432")
    var error = setTimeout(function () {
        t.error("No message received from server")
        es.close()
        t.end()
    }, 5000)
    es.onmessage = function (e) {
        t.equal("hello world", e.data)
        clearTimeout(error)
        t.end()
    }
})