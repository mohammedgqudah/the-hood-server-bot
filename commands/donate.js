import discord from "discord.js";

export default (client, msg) => {
  let amount = msg.content.split(" ")[2];
  let user = msg.mentions.users.first();
  let weebies = client.db.get(`weebies.${msg.author.id}`).value() || 0;
  if (!user) return msg.reply("pls mention a user");
  if (!Number(amount) || Number(amount) < 0)
    return msg.reply("pls provide a valid ammount");
  if (amount > weebies) return msg.reply(`You don't have enough Hoes.`);

  console.log(amount, user.id);

  client.db
    .update(`weebies.${user.id}`, (n = 0) => Number(n) + Number(amount))
    .write();
  client.db
    .update(`weebies.${msg.author.id}`, (n = 0) => Number(n) - Number(amount))
    .write();

  const embed = new discord.RichEmbed()
    // .setColor('#0099ff')
    .setDescription(`Successfully donated ${amount} hoes to ${user.username}`)
    .setAuthor(msg.author.username, msg.author.avatarURL)
    .setTimestamp();
  msg.channel.send(embed);
};
