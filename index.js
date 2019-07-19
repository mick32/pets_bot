const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');
const token = '';
const bot = new TelegramBot(token, {polling: true});

const options = {
  "reply_markup": {
     "keyboard": [["Get dog 🐶", 'Get cat 🐱', 'Get panda 🐼']],
     "resize_keyboard": true
   }
}

const optionsAfterSendPic = {
  "reply_markup": {
    "remove_keyboard": true 
   }
}

function getImage(obj) {
  const url = {
    'dog': 'https://some-random-api.ml/img/dog',
    'cat': 'https://some-random-api.ml/img/cat',
    'panda': 'https://some-random-api.ml/img/panda'
  }

  return fetch(url[obj])
  .then(response => response.json())
  .catch(error => console.error(error))
}

function getFact(obj) {
  const url = {
    'dog': 'https://some-random-api.ml/facts/dog',
    'cat': 'https://some-random-api.ml/facts/cat',
    'panda': 'https://some-random-api.ml/facts/panda'
  }

  return fetch(url[obj])
  .then(response => response.json())
  .catch(error => console.error(error))
}

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text.trim().toLocaleLowerCase();
  const username = msg.chat.first_name;

  if (text == '/start') {
    const start_message = `Hi, ${username}! I can send animals pic for you =)`;
    bot.sendMessage(chatId, start_message, options);
  }

  if (text.includes('get dog')) {
    getImage('dog')
    .then(data => bot.sendPhoto(chatId, data.link, optionsAfterSendPic)
    .catch(error => bot.sendMessage(chatId, 'Ooops, something wrong', options))
    .then(() => getFact('dog')
    .then(data => bot.sendMessage(chatId, data.fact, options)
    .catch(error => bot.sendMessage(chatId, 'Ooops, something wrong', options)))))
  }

  if (text.includes('get cat')) {
    getImage('cat')
    .then(data => bot.sendPhoto(chatId, data.link, optionsAfterSendPic)
    .catch(error => bot.sendMessage(chatId, 'Ooops, something wrong', options))
    .then(() => getFact('cat')
    .then(data => bot.sendMessage(chatId, data.fact, options)
    .catch(error => bot.sendMessage(chatId, 'Ooops, something wrong', options)))))
  }

  if (text.includes('get panda')) {
    getImage('panda')
    .then(data => bot.sendPhoto(chatId, data.link, optionsAfterSendPic)
    .catch(error => bot.sendMessage(chatId, 'Ooops, something wrong', options))
    .then(() => getFact('panda')
    .then(data => bot.sendMessage(chatId, data.fact, options)
    .catch(error => bot.sendMessage(chatId, 'Ooops, something wrong', options)))))
  } 
});