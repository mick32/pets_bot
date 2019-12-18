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

const getSubscribers = async () => {
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

  return subscribers;
};

const sendNotifications = async () => {
  const subscribers = await getSubscribers();
  const message =
    "Не забывай посмотреть и узнать что-то новое о любимых зверушках. Они скучают по тебе =)";
  const photoUrl = "https://memchik.ru/images/templates/kot_shrek.jpg";

  try {
    for (let subscriber of subscribers) {
      bot.sendPhoto(subscriber, photoUrl, {
        caption: message
      });
    }
  } catch (e) {
    console.log("oops, something is wrong");
  }
};

sendNotifications();
