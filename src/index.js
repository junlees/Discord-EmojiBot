import fs from "fs";
import { Client, Intents, MessageEmbed } from "discord.js";
import config from "./config/config.json" assert { type: "json" };
import emojiList from "./static/emoji.json" assert { type: "json" };

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const emoji_series = ["coco1", "coco2", "coco3", "pepe", "elaina", "animal"];

const emoteRegex = /<:.+:(\d+)>/gm;
const hasEmoteRegex = /<a?:.+:\d+>/gm;
const animatedEmoteRegex = /<a:.+:(\d+)>/gm;

const selectEmoji = "<:select_1:945491737177120798>"; //<:select_1:945491737177120798> will be deprecated
const tagShowEmojies = "<:select_1:945491737177120798>"; //<:select_1:945491737177120798>
const listImg = "https://imgur.com/lfqu9Iz";

client.login(config.token);

client.on("ready", () => {
  console.log("Ready");
});

client.on("messageCreate", async (message) => {
  const isMessageBotItSelf = message.author.bot;
  const isMessageEmoji =
    message.content.startsWith("<:") || message.content.startsWith("<a:");
  const isMessageCommand = message.content.startsWith("!");

  // 봇이 보낸 메시지인 경우 무시
  if (isMessageBotItSelf) return;

  // 이모티콘 리스트 보기
  if (message.content === tagShowEmojies) {
    message.delete();
    message.channel.send(listImg);

    return;
  }

  // 이모티콘 확대
  if (isMessageEmoji) {
    message.delete();

    const cdnPath = emoteRegex.exec(message.content)
      ? ((emoteRegex.lastIndex = 0),
        emoteRegex.exec(message.content)[1] + ".png?=v1")
      : ((animatedEmoteRegex.lastIndex = 0),
        animatedEmoteRegex.exec(message.content)[1] + ".gif?=v1");
    const url = "https://cdn.discordapp.com/emojis/" + cdnPath;

    const embed = new MessageEmbed({
      author: {
        name: message.author.username,
        icon_url: message.author.avatarURL(),
      },
      image: { url },
    });

    message.channel.send({ embeds: [embed] });

    return;
  }

  if (isMessageCommand) {
    const command = message.content.split(/\s*[!, -]\s*/);
    console.log(command);
  }
});

// var listEmoId;
// client.on("messageCreate", async (listEmo) => {
//   const n = Number(listEmo.content);
//   if (
//     !n &&
//     listEmo.author.bot &&
//     list_Detect != 1 &&
//     username !== listEmo.author.username
//   ) {
//     return;
//   }

//   console.log("listEmo n " + n);
//   listEmoId = listEmo.id;
//   const list_Url = array_list[n - 1];
//   if (n >= 1 && n <= array_list.length) {
//     listEmo.channel.messages.fetch(list_msgId).then((msg) => {
//       msg.delete();
//     });
//     listEmo.channel
//       .send(list_Url)
//       .then((msg) => {
//         select_msgId = msg.id;
//       })
//       .catch();
//     list_Detect = 0;
//     select_Detect = 1;
//     listEmo.delete();
//     emolist = n;
//   }
//   console.log("list_Detect " + list_Detect);
// });

// client.on("messageCreate", async (selectEmo) => {
//   const n = Number(selectEmo.content);
//   if (
//     !n &&
//     selectEmo.author.bot &&
//     selectEmo.id === listEmoId &&
//     select_Detect != 1 &&
//     username !== selectEmo.author.username
//   ) {
//     return;
//   }
//   console.log("selectEmo n " + n);

//   var select_Url;
//   var arraylength;
//   if (emolist == 1) {
//     select_Url = array_pepe[n - 1];
//     arraylength = array_pepe.length;
//   } else if (emolist == 2) {
//     select_Url = array_coco[n - 1];
//     arraylength = array_coco.length;
//   } else if (emolist == 3) {
//     select_Url = array_coco2[n - 1];
//     arraylength = array_coco2.length;
//   } else if (emolist == 4) {
//     select_Url = array_elaina[n - 1];
//     arraylength = array_elaina.length;
//   } else if (emolist == 5) {
//     select_Url = array_animal[n - 1];
//     arraylength = array_animal.length;
//   }
//   //console.log(select_Url);
//   if (n >= 1 && n <= arraylength) {
//     selectEmo.channel.messages
//       .fetch(select_msgId)
//       .then((msg) => {
//         msg.delete();
//       })
//       .catch();
//     const embed = new MessageEmbed()
//       .setAuthor({
//         name: selectEmo.author.username,
//         iconURL: selectEmo.author.avatarURL(),
//       })
//       .setImage(select_Url);

//     selectEmo.channel.send({ embeds: [embed] });
//     select_Detect = 0;
//     selectEmo.delete();
//   }
//   console.log("select_Detect " + select_Detect);
// });

// client.on("messageCreate", async (selectEmoFast) => {
//   if (!selectEmoFast.content.startsWith("!")) {
//     return;
//   }

//   const FastSelect = selectEmoFast.content;
//   const FastSelectList = FastSelect.split(/\s*[!,-]\s*/);
//   console.log(FastSelectList);

//   var select_Url;
//   var arraylength;
//   if (FastSelectList[1] == 1) {
//     select_Url = "https://imgur.com/" + array_pepe[FastSelectList[2] - 1];
//     arraylength = array_pepe.length;
//   } else if (FastSelectList[1] == 2) {
//     select_Url = "https://imgur.com/" + array_coco[FastSelectList[2] - 1];
//     arraylength = array_coco.length;
//   } else if (FastSelectList[1] == 3) {
//     select_Url = "https://imgur.com/" + array_coco2[FastSelectList[2] - 1];
//     arraylength = array_coco2.length;
//   } else if (FastSelectList[1] == 4) {
//     select_Url = "https://imgur.com/" + array_elaina[FastSelectList[2] - 1];
//     arraylength = array_elaina.length;
//   } else if (FastSelectList[1] == 5) {
//     select_Url = "https://imgur.com/" + array_animal[FastSelectList[2] - 1];
//     arraylength = array_animal.length;
//   }
//   if (FastSelectList[2] >= 1 && FastSelectList[2] <= arraylength) {
//     const embed = new MessageEmbed()
//       .setAuthor({
//         name: selectEmoFast.author.username,
//         iconURL: selectEmoFast.author.avatarURL(),
//       })
//       .setImage(select_Url);

//     selectEmoFast.channel.send({ embeds: [embed] });
//     selectEmoFast.delete();
//   }
// });
