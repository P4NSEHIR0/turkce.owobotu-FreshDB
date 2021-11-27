const Discord = require('discord.js');
const client = global.client
const moment = require("moment");
moment.locale("tr")

module.exports = async () => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  client.user.setStatus("idle");
  client.user.setActivity("Türkçe Owo Bot :) | LosKros", { type: "WATCHING"}); //// TYPE - WATCHING , PLAYING , LISTENING gibi değiştirilebilir.

}
module.exports.conf = {
  name: "ready",
};