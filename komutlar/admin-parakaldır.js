const Discord = require('discord.js');
const FreshDB = require("fresh.db");
let db = new FreshDB();

const conf = require('../ayarlar')

exports.run = async(client, message, args) => {

    let adminler = conf.adminler.find(x => x);

    if(message.member.id !== adminler) return;

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) return message.channel.send("üye etiketlemen lazım!")
    let bakiyekle = parseInt(args[1]);
    if(!bakiyekle) return message.channel.send("kaldırılacak miktar belirlemelisin")

    db.s.add(`bakiyem.${member.id}` , -bakiyekle)

const embed = new Discord.MessageEmbed()
.setDescription(`
**───────────────**
**➥ Bakiye Kaldırıldı :** : \`${bakiyekle}\` Kaldırdıldı
**───────────────**
`)
.setFooter("LosKros <3 Fresh.DB")
.setThumbnail(member.user.avatarURL({ dynamic: true, size: 2048 }))

await message.channel.send(embed)

}
exports.conf = {
    aliases : ['parakaldır'],
    permLevel : 0
}
 
exports.help = {name : 'parakaldır'}