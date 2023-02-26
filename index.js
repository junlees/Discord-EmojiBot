const { Client, Intents, DiscordAPIError, Channel, Discord, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const config = require("./config.json");

var fs = require('fs');
var array_coco = fs.readFileSync("list_coco.txt").toString().split("\n");
var array_coco2 = fs.readFileSync('list_coco2.txt').toString().split("\n");
var array_pepe = fs.readFileSync('list_pepe.txt').toString().split("\n");
var array_elaina = fs.readFileSync('list_elaina.txt').toString().split("\n");
var array_animal = fs.readFileSync('list_animal.txt').toString().split("\n");
var array_list = fs.readFileSync('list.txt').toString().split("\n");
const selectEmoji = "<:select_1:945491737177120798>";//<:select_1:945491737177120798>
const listImg = "https://imgur.com/lfqu9Iz";
client.on('ready', () => {
    console.log('Ready');
});

//Detect 
var list_Detect;
var select_Detect;

//msgId
var list_msgId;
var select_msgId;


var username;
var emolist;


client.on('messageCreate', async message => {
    console.log("message -> " + message.content);
    if (message.author.bot == true) {
        //console.log("return"+message.author);
        return;
    }
    else if (message.content == (selectEmoji)) {
        return;
    }
    else if (!message.content.startsWith("<:")) {
        if (!message.content.startsWith("<a:")) {
            console.log(message.author.username+" chat -> " + message.content);
            return;
        }
    }

    const hasEmoteRegex = /<a?:.+:\d+>/gm;
    const emoteRegex = /<:.+:(\d+)>/gm;
    const animatedEmoteRegex = /<a:.+:(\d+)>/gm;

    const messages = await message.channel.messages.fetch();
    const messageFind = messages.find(m => m.content.match(hasEmoteRegex));
    
  

    if (emoji = emoteRegex.exec(messageFind)) {
        var Url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".png?v=1";
        //message.channel.send(Url);
        console.log(message.author.username+" Send png ->"+emoji[0]);
        
    }
    else if (emoji = animatedEmoteRegex.exec(messageFind)) {
        var Url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".gif?v=1";
        //message.channel.send(Url);
        console.log(message.author.username+" Send gif ->"+emoji[0]);
    }
    //else {
    //    message.channel.send("Couldn't find an emoji to paste!");
    //}
    const embed = new MessageEmbed()
        //.setColor('#0099ff')
        //.setTitle('Some title')
        //.setURL('https://discord.js.org/')
        .setAuthor({ name: message.author.username , iconURL: message.author.avatarURL()})
        //.setDescription('Some description here')
        //.setThumbnail('https://i.imgur.com/AfFp7pu.png')
        // .addFields(
        //     { name: 'Regular field title', value: 'Some value here' },
        //     { name: '\u200B', value: '\u200B' },
        //     { name: 'Inline field title', value: 'Some value here', inline: true },
        //     { name: 'Inline field title', value: 'Some value here', inline: true },
        // )
        //.addField('Inline field title', 'Some value here', true)
        .setImage(Url)
        //.setTimestamp()
        //.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
    
    message.channel.send({embeds: [embed]});
    message.delete();
    
});

client.on('messageCreate', async selectEmoDetect => {
    if (selectEmoDetect.content == selectEmoji) {
        username = selectEmoDetect.author.username;
        selectEmoDetect.channel.send(listImg)
            .then(msg => {
                list_msgId = msg.id;
                //setTimeout(() => msg.delete(), 10000)
                //setTimeout(() => detect = 0, 10000)
            })
            .catch();
        selectEmoDetect.delete();
        list_Detect = 1;
    }
    console.log("selectEmoDetect " + list_Detect);
});

var listEmoId;
client.on('messageCreate', async listEmo => {
    const n= Number(listEmo.content);
    if(!n) {
        return;
    }
    if(listEmo.author.bot == true) {
        return;
    }
    else if(list_Detect != 1) {
        return;
    }
    else if(username != listEmo.author.username) {
        return;
    }

    console.log("listEmo n " + n);
    listEmoId = listEmo.id;
    const list_Url = array_list[n-1];
    if((n >= 1) && (n <= array_list.length)) {
        listEmo.channel.messages.fetch(list_msgId)
            .then(msg => {
                msg.delete();
            })
        listEmo.channel.send(list_Url)
            .then(msg => {
                select_msgId = msg.id;
            })
            .catch();
        list_Detect = 0;
        select_Detect = 1;
        listEmo.delete();
        emolist = n;
    }
    console.log("list_Detect " + list_Detect);

});

client.on('messageCreate', async selectEmo => {
    const n= Number(selectEmo.content);
    if(!n) {
        return;
    }
    else if(selectEmo.author.bot == true) {
        return;
    }
    else if (selectEmo.id == listEmoId) {
        return;
    }
    else if(select_Detect != 1) {
        return;
    }
    else if(username != selectEmo.author.username) {
        return;
    }
    console.log("selectEmo n " + n);

    var select_Url;
    var arraylength;
    if (emolist==1) {
        select_Url = array_pepe[n-1];
        arraylength = array_pepe.length;
    }
    else if (emolist==2) {
        select_Url = array_coco[n-1];
        arraylength = array_coco.length;
    }
    else if (emolist==3) {
        select_Url = array_coco2[n-1];
        arraylength = array_coco2.length;
    }
    else if (emolist==4) {
        select_Url = array_elaina[n-1];
        arraylength = array_elaina.length;
    }
    else if (emolist==5) {
        select_Url = array_animal[n-1];
        arraylength = array_animal.length;
    }
    //console.log(select_Url);
    if((n >= 1) && (n <= arraylength)) {
        selectEmo.channel.messages.fetch(select_msgId)
            .then(msg => {
                msg.delete();
            })
            .catch();
        const embed = new MessageEmbed()
        .setAuthor({ name: selectEmo.author.username , iconURL: selectEmo.author.avatarURL()})
        .setImage(select_Url)
        
        

        selectEmo.channel.send({embeds: [embed]});
        select_Detect = 0;
        selectEmo.delete();
    }
    console.log("select_Detect " + select_Detect);
});

client.on('messageCreate', async selectEmoFast => {

    if (!selectEmoFast.content.startsWith("!")) {
        return;
    }

    const FastSelect = selectEmoFast.content;
    const FastSelectList = FastSelect.split(/\s*[!,-]\s*/);
    console.log(FastSelectList);

    var select_Url;
    var arraylength;
    if (FastSelectList[1]==1) {
        select_Url = array_pepe[FastSelectList[2]-1];
        arraylength = array_pepe.length;
    }
    else if (FastSelectList[1]==2) {
        select_Url = array_coco[FastSelectList[2]-1];
        arraylength = array_coco.length;
    }
    else if (FastSelectList[1]==3) {
        select_Url = array_coco2[FastSelectList[2]-1];
        arraylength = array_coco2.length;
    }
    else if (FastSelectList[1]==4) {
        select_Url = array_elaina[FastSelectList[2]-1];
        arraylength = array_elaina.length;
    }
    else if (FastSelectList[1]==5) {
        select_Url = array_animal[FastSelectList[2]-1];
        arraylength = array_animal.length;
    }
    if((FastSelectList[2] >= 1) && (FastSelectList[2] <= arraylength)) {
        const embed = new MessageEmbed()
        .setAuthor({ name: selectEmoFast.author.username , iconURL: selectEmoFast.author.avatarURL()})
        .setImage(select_Url)

        selectEmoFast.channel.send({embeds: [embed]});
        selectEmoFast.delete();
    }
    
    
});

client.login(config.token);