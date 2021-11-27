const fs = require("fs");
const client = global.client


fs.readdir("./komutlar", (err, files) => {
  if (err) return console.error(err);
  files
  .filter((f) => f.endsWith(".js"))
  .forEach((f) => {
    let props = require(`../komutlar/${f}`)

    client.commands.set(props.help.name, props);
    console.log(`[KOMUT] ${props.help.name}.js`);
    props.conf.aliases.forEach((alias) => {
      client.aliases.set(alias, props.help.name);
    });
  });
});