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

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDay();

const sendNotifications = async () => {
  const requestData = await db.ref("users/").once("value");
  const data = requestData.val();
  let result = [];

  for (let user in data) {
    try {
      if (data[user].hasOwnProperty("last_usage")) {
        const last_usage = data[user].last_usage.split("/");
        const userMonth = last_usage[0];
        const userDay = last_usage[1];
        const userYear = last_usage[2];

        result.push(data[user].id);
      }
    } catch {
      console.log("error");
    }
  }

  console.log(result);
};

sendNotifications();
