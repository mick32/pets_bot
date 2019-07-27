var admin = require("firebase-admin");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const token = process.env.TEST_TOKEN;
//const bot = new TelegramBot(token, { polling: true });

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://petstestbot.firebaseio.com"
});

const db = admin.database();

const notificate = async () => {
  db.ref("users/").once("value", snap => {
    const userChatId = Object.keys(snap.val());
    for (let chatId of userChatId) {
      bot.sendMessage(
        chatId,
        "Эй, не забывай посмотреть на своих любимых зверушек. Они скучают по тебе =)"
      );
    }
  });
};
