require("dotenv").config();

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

const { format } = require("date-fns");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DB_URL
});

const db = admin.database();

const saveUserData = (chatId, from, firstname) => {
  const date = format(new Date(), "yyyy-MM-dd");
  const docRef = db.ref(`users/${chatId}`);

  docRef.set({
    id: chatId,
    country: from,
    firstname: firstname,
    last_usage: date
  });
};

const saveClicksByAdvertiseTag = tag => {
  const date = format(new Date(), "yyyy-MM-dd");
  const docRef = db.ref(`advert/${tag}/${date}`);

  docRef.transaction(currentData => {
    if (!currentData) {
      return { clicks: 1 };
    }

    const currentClicks = currentData.clicks;
    return { clicks: currentClicks + 1 };
  });
};

const saveUserClick = pet => {
  const date = format(new Date(), "yyyy-MM-dd");
  const docRef = db.ref(`analytics/${date}`);

  docRef.transaction(currentData => {
    if (!currentData) {
      return { [pet]: { clicks: 1 } };
    }

    if (currentData && !currentData[pet]) {
      return { ...currentData, [pet]: { clicks: 1 } };
    }

    try {
      const currentClicks = currentData[pet].clicks;

      return { ...currentData, [pet]: { clicks: currentClicks + 1 } };
    } catch (e) {
      console.log(e);
    }
  });
};

exports.saveUserClick = saveUserClick;
exports.saveUserData = saveUserData;
exports.saveClicksByAdvertiseTag = saveClicksByAdvertiseTag;
