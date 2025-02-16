require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });

const { sendContentToUser } = require("./getData");
const { DefaultKeyboad } = require("./keyboardOptions");
const {
  saveUserData,
  saveUserClick,
  saveClicksByAdvertiseTag
} = require("./analytics");

const petsMap = {
  Собачка: "dog",
  Котик: "cat",
  Панда: "panda",
  Коала: "koala",
  Лиса: "fox"
};

bot.on("message", ({ chat, text, from }) => {
  const chatId = chat.id;
  const [pet] = text.split(" ");
  const userName = chat.first_name;
  const langCode = from.language_code;
  const start_message = `Привет, ${userName}! Я могу отправить фото и факт о твоем любимом животном =)`;
  const withAdvertise = text.match(/\/start (.+)/) !== null;

  if (withAdvertise) {
    const advTag = text.match(/\/start (.+)/)[1];

    saveClicksByAdvertiseTag(advTag);
    saveUserData(chatId, langCode, userName);
    bot.sendMessage(chatId, start_message, DefaultKeyboad);

    return;
  }

  if (text == "/start") {
    bot.sendMessage(chatId, start_message, DefaultKeyboad);
    saveUserData(chatId, langCode, userName);

    return;
  }

  if (!petsMap[pet]) {
    bot.sendMessage(
      chatId,
      `К сожалению, я не знаю такого животного :( Попробуйте выбрать кого-то на появившейся клавиатуре`,
      DefaultKeyboad
    );
    return;
  }

  try {
    sendContentToUser(chatId, petsMap[pet]);
  } catch (e) {
    bot.sendMessage(
      chatId,
      "Ой, что-то пошло не так. Попробуй еще раз",
      DefaultKeyboad
    );
  }

  saveUserData(chatId, langCode, userName);
  saveUserClick(petsMap[pet]);
});
