const Discord = require('discord.js');


const FreshDB = require("fresh.db");
let db = new FreshDB();
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr');

exports.run = async(client, message, args) => {

    let member = message.author;

    let cooldown = moment.duration(db.get(`topmoney.${message.author.id}`)-Date.now()).format(`w [Hafta] d [Gün] h [Saat] m [Dakika] s [Saniye]`)
    if(db.get(`topmoney.${message.author.id}`) > Date.now()) {return message.channel.send(`⏱ | ${member}! Lütfen ${cooldown} sonra tekrar deneyiniz!`).then(e=> e.delete({timeout: 5000}) ) }
  
    db.set(`topmoney.${member.id}`, Date.now()+require('ms')('5s'));

    let list = message.guild.members.cache.filter(uye => db.get(`bakiyem.${uye.id}`)).array().sort((uye1, uye2) => Number(db.get(`bakiyem.${uye1}`))-Number(db.get(`bakiyem.${uye2}`))).slice(0, 10).map((uye, index) => (index+1)+" • <@"+ uye +"> | \`" + db.get(`bakiyem.${uye.id}`) +"\` Paraya sahip").join('\n');

    const embed = new Discord.MessageEmbed()
    .setDescription(list)
    .setColor("black")
    .setFooter("Sunucudaki En Zenginler Top 10 | LosKros <3 Fresh.DB")

    message.channel.send(embed)
}
exports.conf = {
    permLevel : 0,
    aliases : []
}
 
exports.help = {name : 'topmoney'}