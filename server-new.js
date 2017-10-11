/**
 * Created by gaohu on 2017/8/10.
 */
var https = require('https');
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var hostname = '127.0.0.1';
var mine = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};
var options = {
    key: fs.readFileSync('./214275541520690.key'),
    cert: fs.readFileSync('./214275541520690.pem')
};
var httpServer = http.createServer(function (req, rep) {
    rep.writeHead(302, {'Location' :  'https://' + req.headers.host + req.url});
    rep.end();
});
var httpsServer = https.createServer(options,function (req, rep) {
    var pathName = url.parse(req.url).pathname;
    if (pathName.charAt(pathName.length - 1) == '/') {
        pathName += 'index.html';
    }
    var filePath = path.join('./src/app', pathName);
    var ext = path.extname(filePath);
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(filePath, function (exists) {
        if (!exists) {
            rep.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            rep.write("This request URL " + pathName + "was not found on this server!");
            rep.end();
        } else {
            fs.readFile(filePath, 'binary', function (err, file) {
                if (err) {
                    rep.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    rep.end();
                } else {
                    var contentType = mine[ext] || 'text/plain';
                    rep.writeHead(200, {
                        'content-Type': contentType
                    });
                    rep.write(file, 'binary');
                    rep.end();
                }
            })
        }
    })
});
httpsServer.listen(443);
httpServer.listen(80);
console.log("Server is runing");












