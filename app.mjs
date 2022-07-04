import fs from 'fs';
import http from 'http';
import express from 'express';
import cors from 'cors';　
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import apiRouter from './routes/api.mjs';
import funcRouter from './routes/func.mjs';

const fsp = fs.promises;
const dirname = path.dirname(new URL(import.meta.url).pathname);
const LISTEN_IP = "127.0.0.1";
const LISTEN_PORT = 3000;

let webServer;
let app;
let _count = 0;

const docOpt = {
  swaggerDefinition: {
    info: {
      title: 'api-skelton',
      version: '0.1.0',
      description: "api-skelton です。",
      license: {
        name: "MIT",
        url:"/LICENSE.txt"
      },
    },
    host: 'localhost:3000'
  },
  apis: ['./routes/api.mjs', './routes/func.mjs']
};

try {
  await runExpressApp();
  await runWebServer();
} catch (err) {
  console.error(err);
}

async function runExpressApp() {
  app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  app.use('/api',apiRouter);
  app.use('/func',funcRouter);
  app.use('/spec',swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(docOpt)));
  app.use('/LICENSE.txt',express.static("./LICENSE.txt"));
}

async function runWebServer() {
  webServer = http.createServer(app);
  webServer.on('error', (err) => {
    console.error('starting web server failed:', err.message);
  });

  await new Promise((resolve) => {
    webServer.listen(LISTEN_PORT, () => {
      console.log('server is running PORT:'+LISTEN_PORT);
      resolve();
    });
  });
}
