import discord from "discord.js";
import shortid from "shortid";

export const CREATE_DROP = (client, msg) => {
  let drop_words = client.db.get("settings.drop_words").value();
  let name = drop_words[Math.floor(Math.random() * drop_words.length)];
  let weebies = Math.floor(Math.random() * (40 - 20) + 20);
  client.db.set(`active_drop.${msg.channel.id}`, { name, weebies }).write();
  const embed = new discord.RichEmbed()
    // .setColor('#0099ff')
    .setTitle("hoes Crate Drop")
    .setDescription(`First one to type \`${name}\` gains ${weebies} hoes`)
    .setTimestamp();

  msg.channel.send(embed);
  setTimeout(() => {
    if (client.db.get(`active_drop.${msg.channel.id}`).value()) {
      client.db.unset(`active_drop.${msg.channel.id}`).write();
      let embed = new discord.RichEmbed()
        // .setColor('#0099ff')
        .setDescription(`No one took the drop, drop deleted`)
        .setTimestamp();
      msg.channel.send(embed);
    }
  }, 30000);
};
