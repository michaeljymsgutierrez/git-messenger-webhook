/**
 * Git + Facebook webhook like messenger
 *
 */
("use strict");

require("dotenv").config();
const login = require("facebook-chat-api");
const shell = require("shelljs");

if (
  process.env.TITLE &&
  process.env.EMAIL &&
  process.env.PASSWORD &&
  process.env.THREAD
) {
  /**
   * Initialize data to send
   */
  let AUTHOR = null;
  let DATE = null;
  let HASH = null;
  let COMMIT = null;
  let BRANCH = null;
  let POST_DATA = null;
  let HEADER = process.env.TITLE;

  /**
   *  Function for executing shell command
   */
  let NODE_EXEC = command => {
    let result = shell.exec(command);
    if (result.code === 0) {
      return result.stdout;
    }
  };

  AUTHOR = NODE_EXEC("git show --summary | grep Author")
    .replace(/\S+@\S+\.\S+/, "")
    .trim();
  DATE =
    "Date: " +
    NODE_EXEC("git show --summary | grep Date")
      .replace("Date: ", "")
      .trim();
  HASH =
    "Hash: " +
    NODE_EXEC("git show --summary | grep commit")
      .replace("commit", "")
      .trim();
  COMMIT = "Commit: " + NODE_EXEC("git log -1 --pretty=%B").trim();
  BRANCH =
    "Branch: " +
    NODE_EXEC('git branch | grep "*"')
      .replace("*", "")
      .trim();
  POST_DATA = `\n${HEADER}\n\n${BRANCH}\n${COMMIT}\n${AUTHOR}\n${DATE}\n${HASH}\n`;

  login(
    {
      email: process.env.EMAIL,
      password: process.env.PASSWORD
    },
    (err, api) => {
      if (err) {
        return console.error(err);
      } else {
        var yourID = process.env.THREAD;
        api.sendMessage(POST_DATA, yourID);
      }
    }
  );
} else {
  console.log("Oops!, there is something wrong with your '.env' file . . .");
}
