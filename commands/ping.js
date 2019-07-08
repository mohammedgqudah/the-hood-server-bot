import discord from "discord.js";

export default (client, msg) => {
  let resTime = Date.now() - msg.createdTimestamp;
  msg.channel.send(`Pong! \`${resTime}ms\``);
};
