const Discord = require('discord.js');
const FreshDB = require("fresh.db");
let db = new FreshDB();

const conf = require('../ayarlar')

exports.run = async(client, message, args) => {

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) return message.channel.send("üye etiketlemen lazım!")
    if(member == member.user.bot) return message.channel.send("botada para yollamazsın yaww")
    if(member.id == message.member.id) return message.channel.send(`💳 | ${message.author}, ${message.author} ${bakiyekle} coin gönderdi WHATTTTT DOSTUM ÇOK YANLIZSIN`)
    let bakiyekle = parseInt(args[1]);
    if(!bakiyekle) return message.channel.send("miktar belirtmelisin")

    db.s.add(`bakiyem.${message.author.id}` , -bakiyekle)

    db.s.add(`bakiyem.${member.id}` , bakiyekle)
    db.set(`sonkazanılan.${member.id}`, `Coin Transferi : ${message.author.tag} tarafından ${bakiyekle} Para Kazandın`)

 message.channel.send(`💳 | ${message.author}, ${member} ${bakiyekle} coin gönderdi`)

}
exports.conf = {
    aliases : ['send',"gönder"],
    permLevel : 0
}
 
exports.help = {name : 'paragönder'}