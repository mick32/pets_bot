require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TOKEN;
const bot = new TelegramBot(token);

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://petstestbot.firebaseio.com"
});

const db = admin.database();

const currentDate = new Date();
const currentYear = +currentDate.getFullYear();
const currentMonth = +currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();
const message =
  "Хэй, не забывай посмотреть на своих любимых зверушек. Они скучают по тебе =)";

const sendNotifications = async () => {
  const requestData = await db.ref("users/").once("value");
  const data = requestData.val();
  let result = [];
  const arrays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  for (let user in data) {
    if (data[user].hasOwnProperty("last_usage")) {
      const last_usage = data[user].last_usage.split("/");

      const userMonth = +last_usage[0];
      const userDay = +last_usage[1];
      const userYear = +last_usage[2];

      const dayDiff = currentDay - userDay >= 2 ? true : false;
      const monthrDiff = userYear < currentYear ? true : false;
      const yearDiff =
        userYear < currentYear && userMonth < currentMonth ? true : false;

      if (monthrDiff || yearDiff) {
        result.push(data[user].id);
      } else if (dayDiff) {
        result.push(data[user].id);
      }
    }
  }

  console.log(result);

  if (result) {
    for (let chatId of result) {
      bot.sendMessage("test", "test send");
    }
  }
};

sendNotifications();
