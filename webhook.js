// Git + Facebook Webhook API
// Created by: Chaelgutierrez, Mharchicano

'use strict';

require('dotenv').config();
const login = require('facebook-chat-api');
const shell = require('shelljs');
const ip = require('ip');
const fastify = require('fastify')({
  logger: true,
});

const host = ip.address();
const port = process.env.WEBHOOK_PORT ? process.env.WEBHOOK_PORT : '8080';

fastify.post('/integrate/webhook/:tid', function(request, reply) {
  const body = request.body;

  const HEADER = process.env.TITLE;
  const THREAD = request.params.tid;
  const AUTHOR = 'Author: ' + body.commits[0].author.name.trim();
  const BRANCH = 'Branch: ' + body.ref.replace('refs/heads/', '').trim();
  const DATE = 'Date: ' + body.commits[0].timestamp.trim();
  const HASH = 'Hash: ' + body.commits[0].id.trim();
  const COMMIT = 'Commit: ' + body.commits[0].message.trim();
  const POST_DATA = `\n${HEADER}\n\n${BRANCH}\n${COMMIT}\n${AUTHOR}\n${DATE}\n${HASH}\n`;

  if (process.env.TITLE && process.env.EMAIL && process.env.PASSWORD) {
    login(
      {
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
      },
      (err, api) => {
        if (err) {
          return console.error(err);
        } else {
          const yourID = THREAD;
          reply.send({success: true});
          api.sendMessage(POST_DATA, yourID);
        }
      },
    );
  } else {
    console.log("Oops!, there is something wrong with your '.env' file . . .");
  }
});

fastify.listen(port, host, (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
});
