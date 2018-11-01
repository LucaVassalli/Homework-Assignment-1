/* 
* Title: Homework Assignment #1 
* Description: first homework server respond Hello World
* Author: Luca Vassalli
* Date: 01/nov/2018
*/

var http = require('http');
var url = require('url');
var router = require('./router');
var config = require('./config');

var StringDecoder = require('string_decoder').StringDecoder;

var serverHttp = http.createServer((req, response) => {
    unifiedServer(req, response);
});
serverHttp.listen(config.httpPort, () => {
    console.log(config.envName + ' server open on port: ' + config.httpPort);
});

var unifiedServer = (req, res) => {
    var parsedRule = url.parse(req.url, true);
    var path = parsedRule.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    var buffer = '';
    decoder = new StringDecoder('utf-8');
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();

        var chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : router.notFound;

        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': parsedRule.query,
            'method': req.method.toLowerCase(),
            'payload': buffer,
            'headers': req.headers
        };

        chosenHandler(data, (statusCode, payload) => {
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
            payload = typeof (payload) == 'object' ? payload : {};
            var payloadString = JSON.stringify(payload);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
            console.log('returning this response: ', data);
        });
    });
};