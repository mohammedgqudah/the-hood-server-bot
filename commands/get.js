import { check } from "../src/whitelist-only";

export default (client, msg) => {
  if (check(client, msg)) {
    let field = msg.content.split(" ")[1];
    if (!field) return msg.reply("you must provide a setting to get");
    let field_val = client.db.get(field).value();
    msg.channel.send(`\`\`\`${JSON.stringify(field_val, null, 4)}\`\`\``);
  }
};
