require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });

const { sendContentToUser } = require("./getData");
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
    try {
      sendContentToUser(chatId, "dog");
    } catch {
      bot.sendMessage(chatId, "Ooops, something wrong", DefaultKeyboad);
    }
  }

  if (text.includes("get cat")) {
    try {
      sendContentToUser(chatId, "cat");
    } catch {
      bot.sendMessage(chatId, "Ooops, something wrong", DefaultKeyboad);
    }
  }

  if (text.includes("get panda")) {
    try {
      sendContentToUser(chatId, "panda");
    } catch {
      bot.sendMessage(chatId, "Ooops, something wrong", DefaultKeyboad);
    }
  }

  if (text.includes("get koala")) {
    try {
      sendContentToUser(chatId, "koala");
    } catch {
      bot.sendMessage(chatId, "Ooops, something wrong", DefaultKeyboad);
    }
  }

  if (text.includes("get fox")) {
    try {
      sendContentToUser(chatId, "fox");
    } catch {
      bot.sendMessage(chatId, "Ooops, something wrong", DefaultKeyboad);
    }
  }
});
