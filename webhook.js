/**
 * Facebook webhook
 *
 */
require("dotenv").config();
const login = require("facebook-chat-api");
const shell = require("shelljs");

let AUTHOR = null;
let DATE = null;
let HASH = null;
let COMMIT = null;
let BRANCH = null;

shell.exec("git show --summary | grep Author", { async: true }, function(
  code,
  stdout,
  stderr
) {
  if (code == 0) {
    AUTHOR = stdout.replace(/\S+@\S+\.\S+/, "").trim();
    shell.exec("git show --summary | grep Date", { async: true }, function(
      code,
      stdout,
      stderr
    ) {
      if (code == 0) {
        DATE = "Date: " + stdout.replace("Date: ", "").trim();
        shell.exec(
          "git show --summary | grep commit",
          { async: true },
          function(code, stdout, stderr) {
            if (code == 0) {
              HASH = "Hash: " + stdout.replace("commit", "").trim();
              shell.exec("git log -1 --pretty=%B", { async: true }, function(
                code,
                stdout,
                stderr
              ) {
                if (code == 0) {
                  COMMIT = "Commit: " + stdout.trim();
                  shell.exec(
                    "git show --summary | grep commit",
                    { async: true },
                    function(code, stdout, stderr) {
                      if (code == 0) {
                        HASH = "Hash: " + stdout.replace("commit", "").trim();
                        shell.exec(
                          'git branch | grep "*" ',
                          { async: true },
                          function(code, stdout, stderr) {
                            if (code == 0) {
                              BRANCH =
                                "Branch: " + stdout.replace("*", "").trim();
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
                                    api.sendMessage(
                                      "\nCG-Developer: Automated Bot from Gitlab Webhook\n\n" +
                                        BRANCH +
                                        "\n" +
                                        COMMIT +
                                        "\n" +
                                        AUTHOR +
                                        "\n" +
                                        DATE +
                                        "\n" +
                                        HASH +
                                        "\n",
                                      yourID
                                    );
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    }
                  );
                }
              });
            }
          }
        );
      }
    });
  }
});
