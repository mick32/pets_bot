const TelegramBot = require("node-telegram-bot-api");
const token = "";
const bot = new TelegramBot(token, { polling: true });
const { getFact, getImage } = require("./getData");
const { DefaultKeyboad, removeKeyboard } = require("./keyboardOptions");

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
      .then(link =>
        bot
          .sendPhoto(chatId, link, removeKeyboard)
          .then(() =>
            getFact("dog").then(fact =>
              bot.sendMessage(chatId, fact, DefaultKeyboad)
            )
          )
      )
      .catch(error =>
        bot.sendMessage(chatId, "Ooops, something wrong", DefaultKeyboad)
      );
  }

  if (text.includes("get cat")) {
    getImage("cat")
      .then(link =>
        bot
          .sendPhoto(chatId, link, removeKeyboard)
          .then(() =>
            getFact("cat").then(fact =>
              bot.sendMessage(chatId, fact, DefaultKeyboad)
            )
          )
      )
      .catch(error =>
        bot.sendMessage(chatId, "Ooops, something wrong", DefaultKeyboad)
      );
  }

  if (text.includes("get panda")) {
    getImage("panda")
      .then(link =>
        bot
          .sendPhoto(chatId, link, removeKeyboard)
          .then(() =>
            getFact("panda").then(fact =>
              bot.sendMessage(chatId, fact, DefaultKeyboad)
            )
          )
      )
      .catch(error =>
        bot.sendMessage(chatId, "Ooops, something wrong", DefaultKeyboad)
      );
  }
});
