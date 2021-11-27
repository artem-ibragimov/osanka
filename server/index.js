const fs = require('fs');
const http = require('http');
const path = require('path');
const PORT = 8080;

const STATIC = path.resolve(__dirname, '../', 'docs');

http.createServer((req, res) => {
   const url = req.url === '/' ? '/index.html' : removeGetParams(req.url);
   fs.readFile(`${STATIC}${url}`, (err, data) => {
      if (err) {
         res.writeHead(404);
         res.end(JSON.stringify(err));
         return;
      }
      res.writeHead(200);
      res.end(data);
   });
}).listen(PORT, () => { console.log(`Server is on http://localhost:${8080}`); });

function removeGetParams(url) {
   const index = url.indexOf('?');
   if (index === -1) { return url; }
   return url.slice(0, index);
}