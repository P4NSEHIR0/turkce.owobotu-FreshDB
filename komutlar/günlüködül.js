const Discord = require('discord.js');


const FreshDB = require("fresh.db");
let db = new FreshDB();
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr');

exports.run = async(client, message, args) => {

    let member = message.author;

    let cooldown = moment.duration(db.get(`günlüködül.${message.author.id}`)-Date.now()).format(`w [Hafta] d [Gün] h [Saat] m [Dakika] s [Saniye]`)
    if(db.get(`günlüködül.${message.author.id}`) > Date.now()) {return message.channel.send(`⏱ | ${member}! Lütfen ${cooldown} sonra tekrar deneyiniz!`).then(e=> e.delete({timeout: 5000}) ) }
  
    let gümlüködül = db.get(`günlüködüller.${member.id}`) || "0"

    db.s.add(`bakiyem.${member.id}`, 10000)
    db.set(`günlüködül.${member.id}`, Date.now()+require('ms')('12h'));
    db.set(`sonkazanılan.${member.id}`, `Günlük Ödül : 10000 Coin Kazandın`)
    db.set(`günlüködüller.${member.id}` , gümlüködül+1)
     message.channel.send(`${message.author} 10000 Coin Günlük Ödülün Verildi`)
}
exports.conf = {
    aliases : ['günlüködül',"daily"],
    permLevel : 0
}
 
exports.help = {name : 'günlüködül'}