const Discord = require("discord.js");
const client = (global.client = new Discord.Client())
const ayarlar = require("./ayarlar.json");
const fs = require("fs");
const moment = require("moment");
moment.locale("tr")

const FreshDB = require("fresh.db");
let db = new FreshDB();

client.elevation = message => {
  if (!message.guild) {return;}
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.cooldowns = new Discord.Collection();

require('./handlers/eventyükleyici')
require('./handlers/komutyükleyici')

client.login(ayarlar.token);