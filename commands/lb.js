import discord from "discord.js";

export default async (client, msg) => {
  let users = client.db.get(`weebies`).value();
  let sortable = [];
  for (let id in users) {
    sortable.push([id, users[id]]);
  }

  sortable.sort(function(a, b) {
    return b[1] - a[1];
  });
  let desc = "";
  const embed = new discord.RichEmbed()
    // .setColor('#0099ff')
    .setThumbnail("https://i.ibb.co/8Ytkrvw/weebies.png");
  let length = sortable.length >= 10 ? 10 : sortable.length;
  for (let i = 0; i < length; i++) {
    let item = sortable[i];
    desc += `\n#${i+1} <@${item[0]}> : ${item[1]}\n`;
    if (i == length - 1) {
      embed.setDescription(desc);
      msg.channel.send(embed);
    }
  }
};
