require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const fetch = require("node-fetch");
const token = process.env.TOKEN;
const bot = new TelegramBot(token);

const { DefaultKeyboad } = require("./keyboardOptions");
const { getRandomFact } = require("./fakeApi");

const getPhotoAndFact = async (pet, lang = "ru") => {
  const factUrl = `https://some-random-api.ml/facts/${pet}`;
  const photoUrl = `https://some-random-api.ml/img/${pet}`;

  const { link } = await fetch(photoUrl)
    .then(response => response.json())
    .catch(error => console.error(error));

  let fact;

  if (lang === "ru") {
    fact = await getRandomFact(pet).then(response => {
      return response;
    });
  } else {
    fact = await fetch(factUrl)
      .then(response => response.json())
      .catch(error => console.error(error));
  }

  return { photo: link, fact: fact.fact };
};

const sendContentToUser = async (chatId, pet) => {
  const { photo, fact } = await getPhotoAndFact(pet);

  bot.sendPhoto(chatId, photo, { DefaultKeyboad, caption: fact });
};

exports.sendContentToUser = sendContentToUser;
