const Discord = require('discord.js');
const FreshDB = require("fresh.db");
let db = new FreshDB();

exports.run = async(client, message) => {

    let member = message.member || message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let bakiyem = db.get(`bakiyem.${member.id}`) || "0"
    let sonkazanılan = db.get(`sonkazanılan.${member.id}`) || "0"
    let sonkaybedilen = db.get(`sonkaybedilen.${member.id}`) || "0"
    let günlüködüller = db.get(`günlüködüller.${member.id}`) || "0"

    let toplamgörevler = db.get(`görevlerim.${member.id}`) || "0"
 

const embed = new Discord.MessageEmbed()
.setDescription(`
${member} (${member.roles.highest}) verilerin
**───────────────**
**➥ Günlük Ödül Alma Sayın :** : \`${günlüködüller}\`
**➥ Bakiyen :** : \`${bakiyem}\` TL
**───────────────**
**➥ Son Kazanılan Para :** : \`${sonkazanılan}\`
**➥ Son Kaybedilen Para :** : \`${sonkaybedilen}\`
`)
.setFooter("LosKros <3 Fresh.DB")
.setThumbnail(member.user.avatarURL({ dynamic: true, size: 2048 }))

await message.channel.send(embed)

}
exports.conf = {
    aliases : ['bakiyem'],
    permLevel : 0
}
 
exports.help = {name : 'bakiyem'}