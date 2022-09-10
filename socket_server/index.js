global.projectLang = process.env.LANGUAGE ? process.env.LANGUAGE : 'swe';
const http = require('http');
const express = require('express');
const next = require('next');
const port = parseInt(process.env.PORT, 10) || 5000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

app.prepare().then(() => {
  const server = express();
 
  try{
    const httpServer = http.createServer(server); // todo maybe when using https we need to change this
    require('./socket')(httpServer, server); // important for use real time notifications
    httpServer.listen(port, err => {
      if (err) throw err;
      console.log(`> Server connected  on ${process.env.REMOTE_IP}:${port}`);
    });
  }catch (e) {
    console.log('socket error: ', e);
  }
});
