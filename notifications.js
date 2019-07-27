require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TEST_TOKEN;
const bot = new TelegramBot(token);

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://petstestbot.firebaseio.com"
});

const db = admin.database();

const sendNotifications = () => {
  const message =
    "Хэй, не забывай посмотреть на своих любимых зверушек. Они скучают по тебе =)";

  db.ref("users/").once("value", snap => {
    const userChatId = Object.keys(snap.val());
    for (let chatId of userChatId) {
      try {
        bot.sendMessage(chatId, message);
      } catch (err) {
        console.log(
          "Something went wrong when trying to send a Telegram notification",
          err
        );
      }
    }
  });
};

sendNotifications();
