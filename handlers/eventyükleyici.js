const fs = require("fs");
const client = global.client

fs.readdir("./events", (err, files) => {
  if (err) return console.error(err);
  files
    .filter((f) => f.endsWith(".js"))
    .forEach((f) => {
      let prop = require(`../events/${f}`);

      client.on(prop.conf.name, prop);
      console.log(`[EVENT] ${prop.conf.name}.js`);
    });
});