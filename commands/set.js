import { check } from "../src/whitelist-only";

export default (client, msg) => {
  if (check(client, msg)) {
    let field = msg.content.split(" ")[1];
    let value = msg.content.split(" ")[2];
    if (!field) return msg.reply("you must provide a setting to edit");
    if (!value) return msg.reply("you must provide a value to edit");
    let field_val = client.db.get(field).value();
    if (typeof field_val === "object") {
      client.db
        .get(field)
        .push(value)
        .write();
      msg.reply(`${field} has been successfuly updated`);
    } else {
      client.db.set(field, value).write();
      msg.reply(
        `${field} has been successfuly changed from ${field_val} to ${value}`
      );
    }
  }
};
