import discord from "discord.js";

export default (client, msg) => {
  let weebies = client.db.get(`weebies.${msg.author.id}`).value() || 0;
  let user = msg.author,
    v = false;
  if (msg.mentions.users.first()) {
    user = msg.mentions.users.first();
    v = true;
    weebies = client.db.get(`weebies.${user.id}`).value() || 0;
  }
  const embed = new discord.RichEmbed()
    // .setColor('#0099ff')
    .setDescription(
      `${v ? `${user.username} has` : "You have"} ${weebies} hoes`
    )
    .setThumbnail("https://i.ibb.co/8Ytkrvw/weebies.png")
    .setAuthor(user.username, user.avatarURL);
  msg.channel.send(embed);
};
