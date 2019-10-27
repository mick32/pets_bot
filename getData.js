require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const token = "849839741:AAEj82xfVBGLXEK3TgJR8o4EpGrkjK1H2Ng";
const bot = new TelegramBot(token);

const fetch = require("node-fetch");

const { DefaultKeyboad } = require("./keyboardOptions");

const getPhotoAndFact = async pet => {
  const factUrl = `https://some-random-api.ml/facts/${pet}`;
  const photoUrl = `https://some-random-api.ml/img/${pet}`;

  const photo = await fetch(photoUrl)
    .then(response => response.json())
    .catch(error => console.error(error));

  const fact = await fetch(factUrl)
    .then(response => response.json())
    .catch(error => console.error(error));

  return { photo: photo.link, fact: fact.fact }; //to do: FACT NAMING!!!
};

const sendContentToUser = async (chatId, pet) => {
  const result = await getPhotoAndFact(pet);

  bot.sendPhoto(
    chatId,
    result.photo,
    Object.assign(DefaultKeyboad, { caption: result.fact })
  );
};

exports.sendContentToUser = sendContentToUser;
