import { Server } from "http";
import * as express from 'express';
import { createApp } from "./main";
import { Context } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
let cachedServer: Server

async function bootstrap() {
    const expressApp = express();
    const app = await createApp(expressApp);
    await app.init();

    return createServer(expressApp);
}

export async function handler(event: any, context: Context) {
    if (!cachedServer) {
        const server = await bootstrap();
        cachedServer = server;
      }
    return proxy(cachedServer, event, context, 'PROMISE').promise;
}