const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');

module.exports = message => {

  let prefix = ayarlar.prefix.find((x) => message.content.toLowerCase().startsWith(x));
  
  let client = message.client;
  if (message.author.bot) return;
  if (!prefix) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    if (client.cooldowns.has(`${cmd}_${message.author.id}`)) {
        const finish = client.cooldowns.get(`${cmd}_${message.author.id}`)
        const date = new Date();
        const kalan = (new Date(finish - date).getTime() / 1000).toFixed(0);

        const embed = new Discord.MessageEmbed()
        .setTitle(`Selam \`${message.member.displayName}\``)
        .setDescription(`Bu komudu tekrardan kullanabilmek için **${kalan} saniye** beklemeniz gerekmektedir.`)
        .setColor("GOLD")
        .setFooter("LosKros Was Alone!")
 
        return message.channel.send(embed).then(x => x.delete({ timeout: finish - date }));
    };
    
    const finish = new Date();
    finish.setSeconds(finish.getSeconds() + cmd.help.cooldown);
    cmd.run(client, message, params, perms);
    if (cmd.help.cooldown > 0) {
        client.cooldowns.set(`${cmd}_${message.author.id}`, finish);
        setTimeout(() => {
          client.cooldowns.delete(`${cmd}_${message.author.id}`);
        }, cmd.help.cooldown * 1000);
      }
  }

};

module.exports.conf = {
  name: "message",
};