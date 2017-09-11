
const Rx = require('@reactivex/rxjs')
const http = require('http');
const fs = require('fs');
const url = require('url');
const {fork} = require('child_process');
const subject = new Rx.Subject();

function sendFile(e) {

    e.res.writeHead(200,{'Content-Type': 'text/plain'});
    const myURL = url.parse(e.req.url,true);

    const childProcess = fork('./readfile.js',[myURL.query.url]);
    childProcess.send("start");
    childProcess.on('message',result =>{
        console.log(result);
        e.res.write(result);
        e.res.end();
    });
}
subject.subscribe(sendFile);



http.createServer((req,res)=>{
    subject.next({req:req,res:res});
}).listen(4000,'127.0.0.1');
