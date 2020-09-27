import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as p from "path";
const server = http.createServer();
const path = p.resolve(__dirname,'public')
// __dirname 表示当前的项目路径


server.on('request',(request:IncomingMessage,response:ServerResponse)=>{
  const {method,url,headers} = request;
  switch (url) {
    case '/index.html':
      response.setHeader("Content-Type","text/html; charset=utf-8")
      fs.readFile(p.resolve(path,'index.html'),(error,data)=>{
          if(error) throw error;
          response.end(data.toString())
        }
      )
      break
    case '/style.css':
      response.setHeader("Content-Type","text/css; charset=utf-8")
      fs.readFile(p.resolve(path,'style.css'),(error,data)=>{
          if(error) throw error;
          response.end(data.toString())
        }
      )
      break
    case "/main.js":
      response.setHeader("Content-Type","text/js; charset=utf-8")
      fs.readFile(p.resolve(path,'main.js'),(error,data)=>{
          if(error) throw error;
          response.end(data.toString())
        }
      )
      break


  }

})
server.listen(8888)

