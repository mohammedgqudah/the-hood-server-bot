export const check = (client, msg) => {
  let WHITELIST = client.db.get('settings.whitelist').value();
  let allowed = msg.member.roles.find(r => WHITELIST.includes(r.name)) || WHITELIST.includes(msg.author.id);
  return allowed;
}