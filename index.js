const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });
const { getPhotoAndFact } = require("./getData");
const { DefaultKeyboad } = require("./keyboardOptions");
const { saveUserData } = require("./firebase");

bot.on("message", msg => {
  const chatId = msg.chat.id;
  const text = msg.text.trim().toLocaleLowerCase();
  const username = msg.chat.first_name;
  const langCode = msg.from.language_code;

  try {
    saveUserData(chatId, langCode, username);
  } catch {
    console.log("error save data");
  }

  if (text == "/start") {
    const start_message = `Hi, ${username}! I can send animals pic for you =)`;
    bot.sendMessage(chatId, start_message, DefaultKeyboad);
  }

  if (text.includes("get dog")) {
    getPhotoAndFact("dog")
      .then(data =>
        bot.sendPhoto(
          chatId,
          data.photo,
          Object.assign(DefaultKeyboad, { caption: data.fact })
        )
      )
      .catch(error =>
        bot.sendMessage(chatId, "Ooops, something wrong", DefaultKeyboad)
      );
  }

  if (text.includes("get cat")) {
    getPhotoAndFact("cat")
      .then(data =>
        bot.sendPhoto(
          chatId,
          data.photo,
          Object.assign(DefaultKeyboad, { caption: data.fact })
        )
      )
      .catch(error =>
        bot.sendMessage(chatId, "Ooops, something wrong", DefaultKeyboad)
      );
  }

  if (text.includes("get panda")) {
    getPhotoAndFact("panda")
      .then(data =>
        bot.sendPhoto(
          chatId,
          data.photo,
          Object.assign(DefaultKeyboad, { caption: data.fact })
        )
      )
      .catch(error =>
        bot.sendMessage(chatId, "Ooops, something wrong", DefaultKeyboad)
      );
  }

  if (text.includes("get koala")) {
    getPhotoAndFact("koala")
      .then(data =>
        bot.sendPhoto(
          chatId,
          data.photo,
          Object.assign(DefaultKeyboad, { caption: data.fact })
        )
      )
      .catch(error =>
        bot.sendMessage(chatId, "Ooops, something wrong", DefaultKeyboad)
      );
  }

  if (text.includes("get fox")) {
    getPhotoAndFact("fox")
      .then(data =>
        bot.sendPhoto(
          chatId,
          data.photo,
          Object.assign(DefaultKeyboad, { caption: data.fact })
        )
      )
      .catch(error =>
        bot.sendMessage(chatId, "Ooops, something wrong", DefaultKeyboad)
      );
  }
});
