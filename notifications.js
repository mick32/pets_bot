require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const { differenceInCalendarDays } = require("date-fns");
const token = process.env.TOKEN;
const bot = new TelegramBot(token);

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://petstestbot.firebaseio.com"
});

const db = admin.database();

const message =
  "Привет! Не забывай посмотреть на своих любимых зверушек. Они скучают по тебе =)";

const sendNotifications = async () => {
  const users = await db.ref("users/").once("value");
  const usersInfo = users.val();
  const subscribers = [];
  const currentDate = new Date();

  for (let user in usersInfo) {
    if (usersInfo[user].hasOwnProperty("last_usage")) {
      const { last_usage, id } = usersInfo[user];

      const differenceDays = differenceInCalendarDays(
        currentDate,
        new Date(last_usage)
      );

      if (differenceDays > 2) {
        subscribers.push(id);
      }
    }
  }

  console.log(subscribers);

  if (subscribers) {
    for (let subscriber of subscribers) {
      // bot.sendMessage(subscriber, message);
      console.log(`send message to: ${subscriber}`);
    }
  }
};

sendNotifications();
