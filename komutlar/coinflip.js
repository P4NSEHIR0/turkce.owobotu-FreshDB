const Discord = require('discord.js');


const FreshDB = require("fresh.db");
let db = new FreshDB();
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr');

exports.run = async(client, message, args) => {

    let member = message.author;
    let cooldown = moment.duration(db.get(`cfbekleme.${message.author.id}`)-Date.now()).format(`w [Hafta] d [Gün] h [Saat] m [Dakika] s [Saniye]`)

    let kalan = db.get(`cfbekleme.${message.author.id}`)
    let geçen = Date.now()
    let kalanck = kalan - geçen;

    if(db.get(`cfbekleme.${message.author.id}`) > Date.now()) {return message.channel.send(`⏱ | ${member}! Lütfen ${cooldown} sonra tekrar deneyiniz!`).then(e=> e.delete({timeout: kalanck}) ) }

    let bakiyem = db.get(`bakiyem.${member.id}`) || "0"
    let oynanacak = parseInt(args[0]);
    if(!oynanacak) return message.channel.send("Oynamak için miktar girlemisin!")
    if(oynanacak >= "50001") oynanacak = "50000";
    if(bakiyem < oynanacak) return message.channel.send("Yeterli Paran Yok :(")

    let durumlar = ["kazandı" , "kaybetti"]
    let durum = Math.floor((Math.random() * durumlar.length));

     message.channel.send(`**${message.author.username}** çevirilyor :moneybag: ${oynanacak}`).then(mesaj => {
     db.set(`cfbekleme.${member.id}`, Date.now()+require('ms')('10s'));

    if(durum == "0") {
    mesaj.edit(`
  **${message.author.username}** çevirilyor :moneybag: ${oynanacak}
Çevirildi ve.. :moneybag:  sen kazandın :moneybag: ${oynanacak*2}`)

    db.s.add(`bakiyem.${member.id}`, oynanacak*2)
    db.set(`sonkazanılan.${member.id}`, `Coinflips Oynarak : ${oynanacak*2} Para Kazandın`)

    } else if (durum == "1") {
  mesaj.edit(`
  **${message.author.username}** çevirilyor :moneybag: ${oynanacak}
Çevirildi ve.. :moneybag:  sen kaybettin :moneybag: ${oynanacak}`)

             db.s.add(`bakiyem.${member.id}`, -oynanacak)
             db.set(`sonkaybedilen.${member.id}`, `Coinflips Oynarak : ${oynanacak} Para Kaybettin`)
            }

})  
}
exports.conf = {
    aliases : ['cf',"yazı-tura"],
    permLevel : 0
}
 
exports.help = {name : 'cf'}