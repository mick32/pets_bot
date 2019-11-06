require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const fetch = require("node-fetch");
const token = process.env.TOKEN;
const bot = new TelegramBot(token);

const { DefaultKeyboad } = require("./keyboardOptions");

const getPhotoAndFact = async pet => {
  const factUrl = `https://some-random-api.ml/facts/${pet}`;
  const photoUrl = `https://some-random-api.ml/img/${pet}`;

  const { link } = await fetch(photoUrl)
    .then(response => response.json())
    .catch(error => console.error(error));

  const { fact } = await fetch(factUrl)
    .then(response => response.json())
    .catch(error => console.error(error));

  return { photo: link, fact: fact };
};

const sendContentToUser = async (chatId, pet) => {
  const { photo, fact } = await getPhotoAndFact(pet);

  bot.sendPhoto(chatId, photo, { DefaultKeyboad, caption: fact });
};

exports.sendContentToUser = sendContentToUser;
