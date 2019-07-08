import { check } from "../src/whitelist-only";
import discord from "discord.js";

export default (client, msg) => {
  if (check(client, msg)) {
    client.db.update("settings.on", () => "1").write();
    /// embed
    const embed = new discord.RichEmbed().setDescription(
      `maintenance mode off`
    );
    msg.channel.send(embed);
  }
};
