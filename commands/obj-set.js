import { check } from "../src/whitelist-only";

export default (client, msg) => {
  if (check(client, msg)) {
    let field = msg.content.split(" ")[1];
    let value = msg.content
      .split(" ")
      .slice(2)
      .join(" ");
    if (!field) return msg.reply("you must provide a setting to edit");
    if (!value) return msg.reply("you must provide a value to edit");
    let field_val = client.db.get(field).value();
    value = JSON.parse(value);
    client.db.set(field, value).write();
    msg.reply(
      `${field} has been successfuly changed from \`\`\`${JSON.stringify(
        field_val,
        null,
        4
      )}\`\`\` to \`\`\`${JSON.stringify(value, null, 4)}\`\`\``
    );
  }
};
