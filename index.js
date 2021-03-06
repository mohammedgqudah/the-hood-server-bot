import fs from "fs";
import path from "path";
import { promisify } from "util";
import Discord from "discord.js";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import express from "express";
import http from "http";

import { LOGGER } from "./src/logger";
import defaultSettings from "./src/defaultSettings";
import { CREATE_DROP } from "./events-fn/create-drop";
import { TAKE_DROP } from "./events-fn/take-drop";

const client = new Discord.Client();
const adapter = new FileSync("db.json");
const db = low(adapter);
const readDir = promisify(fs.readdir);
const server = express();

server.get("/", (req, res) => res.send("/"));
server.listen(process.env.PORT);
setInterval(function() {
  http.get("http://stark-springs-63443.herokuapp.com");
}, 300000);
require("dotenv").config();

client.on("ready", () => {
  LOGGER.success(`The Hood Discord Bot has started!`);
  LOGGER.info(`Logged in as ${client.user.tag}`);
  db.defaults({
    weebies: {},
    drop_msgs_count: {},
    settings: defaultSettings
  }).write();
  client.db = db;
});

let commands = {},
  commandsNames;
const initCommands = async () => {
  let commandsDir = path.join(__dirname, "commands");
  let commands_paths = await readDir(commandsDir);
  commands_paths = commands_paths.map(cmd_path => {
    return cmd_path.split(".").shift();
  });
  commands_paths.forEach(cmd => {
    commands[cmd] = require(path.join(commandsDir, cmd));
    LOGGER.info(`command ${path.basename(cmd)} is loaded`);
  });
  commandsNames = commands_paths;
};
initCommands();

client.on("message", async msg => {
  // Ignore if the user is a bot
  if (msg.author.bot) return;
  let on = db.get("settings.on").value() == "1";
  ///////
  if (on) {
    let active_drop = db.get(`active_drop.${msg.channel.id}`).value();
    if (active_drop) {
      if (msg.content.toLowerCase() === active_drop.name.toLowerCase()) {
        TAKE_DROP(client, msg, active_drop);
      }
    }
    //////
    //////
    if (!db.get(`drop_msgs_count.${msg.channel.id}`).value()) {
      db.set(`drop_msgs_count.${msg.channel.id}`, 0).write();
    }
    db.update(`drop_msgs_count.${msg.channel.id}`, n => n + 1).write();
    if (
      db.get(`drop_msgs_count.${msg.channel.id}`).value() >=
      db.get("settings.drop_required_msgs").value()
    ) {
      CREATE_DROP(client, msg);
      db.set(`drop_msgs_count.${msg.channel.id}`, 0).write();
    }
  }
  /////
  let PREFIX = db.get("settings.prefix").value();
  let cmd = msg.content
    .split(" ")[0]
    .replace(PREFIX, "")
    .toLowerCase();
  if (msg.content.startsWith(PREFIX) && commandsNames.includes(cmd)) {
    if (
      on ||
      db
        .get("settings.whitelist")
        .value()
        .includes(msg.author.id)
    ) {
      commands[cmd](client, msg);
    } else {
      const embed = new Discord.RichEmbed().setDescription(
        `The bot is currently under development`
      );
      msg.channel.send(embed);
    }
  }
  if (msg.content.toLowerCase() == "ur gay") {
    msg.reply("***NO U***");
  }
});

client.login(process.env.TOKEN);
