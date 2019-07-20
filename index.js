const TelegramBot = require("node-telegram-bot-api");
const token = "";
const bot = new TelegramBot(token, { polling: true });
const { getFact, getImage } = require("./getData");
const { DefaultKeyboad, removeKeyboard } = require("./keyboard_options");

bot.on("message", msg => {
  const chatId = msg.chat.id;
  const text = msg.text.trim().toLocaleLowerCase();
  const username = msg.chat.first_name;

  if (text == "/start") {
    const start_message = `Hi, ${username}! I can send animals pic for you =)`;
    bot.sendMessage(chatId, start_message, DefaultKeyboad);
  }

  if (text.includes("get dog")) {
    getImage("dog")
      .then(data =>
        bot
          .sendPhoto(chatId, data.link, removeKeyboard)
          .then(() =>
            getFact("dog").then(data =>
              bot.sendMessage(chatId, data.fact, DefaultKeyboad)
            )
          )
      )
      .catch(error =>
        bot.sendMessage(chatId, "Ooops, something wrong", DefaultKeyboad)
      );
  }

  if (text.includes("get cat")) {
    getImage("cat")
      .then(data =>
        bot
          .sendPhoto(chatId, data.link, removeKeyboard)
          .then(() =>
            getFact("cat").then(data =>
              bot.sendMessage(chatId, data.fact, DefaultKeyboad)
            )
          )
      )
      .catch(error =>
        bot.sendMessage(chatId, "Ooops, something wrong", DefaultKeyboad)
      );
  }

  if (text.includes("get panda")) {
    getImage("panda")
      .then(data =>
        bot
          .sendPhoto(chatId, data.link, removeKeyboard)
          .then(() =>
            getFact("panda").then(data =>
              bot.sendMessage(chatId, data.fact, DefaultKeyboad)
            )
          )
      )
      .catch(error =>
        bot.sendMessage(chatId, "Ooops, something wrong", DefaultKeyboad)
      );
  }
});
