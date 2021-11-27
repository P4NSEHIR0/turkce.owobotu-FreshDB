const Discord = require('discord.js');


const FreshDB = require("fresh.db");
let db = new FreshDB();
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr');

exports.run = async(client, message, args) => {
    let member = message.author;

    let cooldown = moment.duration(db.get(`slotbekleme.${message.author.id}`)-Date.now()).format(`w [Hafta] d [Gün] h [Saat] m [Dakika] s [Saniye]`)

    let kalan = db.get(`slotbekleme.${message.author.id}`)
    let geçen = Date.now()
    let kalanck = kalan - geçen;

    if(db.get(`slotbekleme.${message.author.id}`) > Date.now()) {return message.channel.send(`⏱ | ${member}! Lütfen ${cooldown} sonra tekrar deneyiniz!`).then(e=> e.delete({timeout: kalanck}) ) }


    let bakiyem = db.get(`bakiyem.${member.id}`) || "0"
    let oynanacak = parseInt(args[0]);
    if(!oynanacak) return message.channel.send("Oynamak için miktar girlemisin!")
    if(oynanacak >= "50001") oynanacak = "50000";
    if(bakiyem < oynanacak) return message.channel.send("Yeterli Paran Yok :(")

    let durumlar = ["armut" , "çilek" , "elma"]
    let durumlar2 = ["armut" , "çilek" , "elma"]
    let durumlar3 = ["armut" , "çilek" , "elma"]
    let random = Math.floor(Math.random() * durumlar.length);
    let random2 = Math.floor(Math.random() * durumlar2.length);
    let random3 = Math.floor(Math.random() * durumlar3.length);

    message.channel.send(`${message.author.username} Slotun çevriliyor..`).then(mesaj => {

    let x = `${random} ${random2} ${random3}`
    mesaj.edit(`${x.replace(`2`,`:strawberry:`).replace(`2`,`:strawberry:`).replace(`2`,`:strawberry:`).replace(`1`,`:apple:`).replace(`1`,`:apple:`).replace(`1`,`:apple:`).replace(`0`,`:pear:`).replace(`0`,`:pear:`).replace(`0`,`:pear:`)} geldi ve kaybettin ${oynanacak} coinin bakiyenden alındı!`)
    db.s.add(`bakiyem.${member.id}`, -oynanacak)
    db.set(`slotbekleme.${member.id}`, Date.now()+require('ms')('15s'));
    db.set(`sonkaybedilen.${member.id}`, `Slots Oynarak : ${oynanacak} Para Kaybettin`)

    if(x == `1 1 1` || x == '2 2 2' || x == '0 0 0')  {
        mesaj.edit(`${x.replace(`2`,`:strawberry:`).replace(`2`,`:strawberry:`).replace(`2`,`:strawberry:`).replace(`1`,`:apple:`).replace(`1`,`:apple:`).replace(`1`,`:apple:`).replace(`0`,`:pear:`).replace(`0`,`:pear:`).replace(`0`,`:pear:`)} kazandın ve ${oynanacak*2} coin bakiyene eklendi`)
        db.s.add(`bakiyem.${member.id}`, oynanacak*2)
        db.set(`sonkazanılan.${member.id}`, `Slots Oynarak : ${oynanacak*2} Para Kazandın`)

    }

})
}
exports.conf = {
    aliases : ['slots',"s"],
    permLevel : 0
}
 
exports.help = {name : 'slots'}