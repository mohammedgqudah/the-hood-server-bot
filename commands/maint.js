import { check } from "../src/whitelist-only";
import discord from "discord.js";

export default (client, msg) => {
  if (check(client, msg)) {
    client.db.update("settings.on", ()=>"0").write();
    /// embed
    const embed = new discord.RichEmbed().setDescription(
      `switched to maintenance mode`
    );
    msg.channel.send(embed);
  }
};
