require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });

const { sendContentToUser } = require("./getData");
const { DefaultKeyboad } = require("./keyboardOptions");
const { saveUserData, saveUserClick } = require("./analytics");

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

  if (text == "/start") {
    const start_message = `Привет, ${userName}! Я могу отправить фото и факт о твоем любимом животном =)`;
    bot.sendMessage(chatId, start_message, DefaultKeyboad);
    saveUserData(chatId, langCode, userName);

    return;
  }

  try {
    sendContentToUser(chatId, petMap[pet]);
  } catch (e) {
    bot.sendMessage(
      chatId,
      "Ой, что-то пошло не так. Попробуй еще раз",
      DefaultKeyboad
    );
  }

  saveUserClick(petsMap[pet]);
});
