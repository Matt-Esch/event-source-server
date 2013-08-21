var console = require("console")
var http = require("http")
var setInterval = require("timers").setInterval
var PORT = process.argv[2] || 53432

http.createServer(handleRequest).listen(PORT, function () {
    console.log("Listening on port ", + PORT)
})


function handleRequest(req, res) {
    eventSourceHead(req, res)
    keepalive(req, res)
    res.socket.setTimeout(0)

    res.write("data: hello world\n\n")
}

var DEFAULT_INTERVAL = 15000
function keepalive(req, res, interval) {
    return setInterval(function () {
        console.log("write")
        res.write("keepalive: test\n\n")
    }, interval || DEFAULT_INTERVAL)
}

function eventSourceHead(req, res) {
    res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
        "Content-Type": "text/event-stream",
        "Transfer-Encoding": "chunked"
    });
}