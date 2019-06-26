import discord from "discord.js";

export const TAKE_DROP = (client, msg, drop) => {
  const embed = new discord.RichEmbed()
    // .setColor('#0099ff')
    .setTitle(`hoes Crate Drop`)
    .setDescription(
      `${msg.author.username} got the hoes crate drop and won ${
        drop.weebies
      } hoes!`
    )
    .setTimestamp();
  client.db
    .update(`weebies.${msg.author.id}`, (n = 0) => {
      return Number(n) + Number(drop.weebies);
    })
    .write();
  client.db.unset(`active_drop.${msg.channel.id}`).write();
  msg.channel.send(embed);
};
