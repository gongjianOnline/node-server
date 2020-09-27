import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as p from "path";
import * as url from 'url';

const server = http.createServer();
const pubilcDir = p.resolve(__dirname, 'public');
// __dirname 表示当前的项目路径


server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  const {method, url: path, headers} = request;
  const {pathname, search} = url.parse(path);
  let filename = pathname.substr(1) || "index.html";

  // response.setHeader("Content-Type", "text/html; charset=utf-8");
  if (method !== "GET") {
    response.statusCode = 405;
    response.end();
    return;
  }
  fs.readFile(p.resolve(pubilcDir, filename), (error, data) => {
      if (error) {
        if (error.errno === -4058) {
          response.statusCode = 404;
          fs.readFile(p.resolve(pubilcDir, '404.html'), (error, data) => {
            response.end(data);
          });
        } else if (error.errno === -4068) {
          response.statusCode = 403;
          response.end("没有权限");
        } else {
          response.statusCode = 500;
          response.end("服务器搬砖了,请稍后再试");
        }
      } else {
        //设置缓存(除了首页之外的所有静态资源都是0毫秒)
        response.setHeader('Cache-Control', 'public,max-age=3153600');
        response.end(data.toString());
      }
    }
  );
});
server.listen(8888);

