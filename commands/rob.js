import discord from "discord.js";

export default (client, msg) => {
  console.log("chance", client.db.get("settings.chance").value());
  let r =
      Math.random() <=
      (Number(client.db.get("settings.chance").value()) || 0.7),
    desc = "";
  let min_weebies = 40;
  let rob = Math.floor(Math.random() * (30 - 10) + 10);
  let user = msg.mentions.users.first();
  if (!user) return msg.reply("You must mention a user to rob");
  if (user.id == msg.author.id)
    return msg.reply(`Fuck off, you can't rob yourself`);
  let user_weebies = client.db.get(`weebies.${user.id}`);
  let author_weebies = client.db.get(`weebies.${msg.author.id}`);
  if (author_weebies < 5) return msg.reply("you must have 5 hoes at least");
  if (Number(user_weebies.value() || 0) < min_weebies)
    return msg.reply(`pls dont rob ${user.username}, they are fucking poor :(`);
  if (r) {
    client.db.update(`weebies.${user.id}`, (n = 0) => Number(n) - rob).write();
    client.db
      .update(`weebies.${msg.author.id}`, (n = 0) => Number(n) + rob)
      .write();
    desc = `You robbed ${rob} hoes from ${user.username}, hot ;)`;
  } else {
    let pun = Math.floor(author_weebies.value() * 0.14);
    desc = `You were caught! You paid ${user.username} ${pun} hoes.`;
    client.db
      .update(`weebies.${msg.author.id}`, (n = 0) => Number(n) - pun)
      .write();
    client.db.update(`weebies.${user.id}`, (n = 0) => Number(n) + pun).write();
  }
  const embed = new discord.RichEmbed()
    // .setColor('#0099ff')
    .setDescription(desc)
    .setThumbnail("https://i.ibb.co/8Ytkrvw/weebies.png")
    .setAuthor(msg.author.username, msg.author.avatarURL);
  msg.channel.send(embed);
};
