// 新建server服务器
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

var hostname = '127.0.0.1';
var port = 3000;

// fs.readFile('index.html', 'utf-8',function(data){
//     console.log(data)
// })
var server = http.createServer(function (req, res) {
    var arg = url.parse(req.url).query;
    var params = querystring.parse(arg)
    console.log(params)
    // res.writeHead(200, {'Content-Type': 'text/html'});
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/html');
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.getHeader('content-type')
    // res.write('<meta charset="utf-8">')

    //   res.charset = 'utf-8';  // 不行

    // var htmlDiv = '<div style="width: 200px;height: 200px;background-color: #f0f;">div</div>';
    // res.write('<b>亲爱的，你慢慢飞，小心前面带刺的玫瑰...</b>');
    // res.write(htmlDiv);
    res.write(`${params}`);
    // 有参数=先调用 res.write(data, encoding) 之后再调用 res.end().
    res.end();
    //  res.end({username: 'lisi', password: 123});
});

server.listen(port, hostname, function () {
    // hostname是const类型时，可以用以下写法
    //console.log('Server running at http://${hostname}:${port}/');

    console.log('Server running at http://%s:%s', hostname, port);
    // console.log('Server running at http://' + hostname + ':' + port + '/');
});