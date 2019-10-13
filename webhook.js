// Git + Facebook Webhook API
// Created by: Chaelgutierrez, Mharchicano

"use strict";

require("dotenv").config();
const login = require("facebook-chat-api");
const shell = require("shelljs");
const ip = require("ip");
const fastify = require("fastify")({
  logger: true
});

let host = ip.address();
let port = process.env.WEBHOOK_PORT ? process.env.WEBHOOK_PORT : "8080";
let AUTHOR = null;
let DATE = null;
let HASH = null;
let COMMIT = null;
let BRANCH = null;
let THREAD = null;
let POST_DATA = null;
let HEADER = process.env.TITLE;

fastify.post("/integrate/webhook/:tid", function(request, reply) {
  let body = request.body;

  THREAD = request.params.tid;
  AUTHOR = "Author: " + body.commits[0].author.name.trim();
  BRANCH = "Branch: " + body.ref.replace("refs/heads/", "").trim();
  DATE = "Date: " + body.commits[0].timestamp.trim();
  HASH = "Hash: " + body.commits[0].id.trim();
  COMMIT = "Commit: " + body.commits[0].message.trim();
  POST_DATA = `\n${HEADER}\n\n${BRANCH}\n${COMMIT}\n${AUTHOR}\n${DATE}\n${HASH}\n`;

  if (process.env.TITLE && process.env.EMAIL && process.env.PASSWORD) {
    login(
      {
        email: process.env.EMAIL,
        password: process.env.PASSWORD
      },
      (err, api) => {
        if (err) {
          return console.error(err);
        } else {
          let yourID = THREAD;
          reply.send({ success: true });
          api.sendMessage(POST_DATA, yourID);
        }
      }
    );
  } else {
    console.log("Oops!, there is something wrong with your '.env' file . . .");
  }
});

fastify.listen(port, host, (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
});
