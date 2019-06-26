import discord from "discord.js";

export default (client, msg) => {
  let desc;
  let side = msg.content.split(" ")[1];
  let amount = msg.content.split(" ")[2];
  let weebies = client.db.get(`weebies.${msg.author.id}`).value() || 0;
  if (!side) return msg.reply("pls provide a side (heads/tails)");
  if (!Number(amount)) return msg.reply("pls provide a valid ammount");
  if (amount > weebies) return msg.reply(`You don't have enough Hoes.`);

  let match = Math.random() * 10 > 5 ? "tails" : "heads";
  if (match == side) {
    client.db
      .update(`weebies.${msg.author.id}`, (n = 0) => Number(n) + Number(amount))
      .write();
    desc = `:white_check_mark: You Won, ${amount} hoes have been added to your bank account.`;
  } else {
    client.db
      .update(`weebies.${msg.author.id}`, (n = 0) => Number(n) - amount)
      .write();
    desc = `:x: You lost, ${amount} Hoes have been taken from your bank account.`;
  }

  const embed = new discord.RichEmbed()
    // .setColor('#0099ff')
    .setDescription(desc)
    .setThumbnail("https://i.ibb.co/8Ytkrvw/weebies.png")
    .setAuthor(msg.author.username, msg.author.avatarURL)
    .setTimestamp();
  msg.channel.send(embed);
};
