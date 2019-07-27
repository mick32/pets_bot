const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://petstestbot.firebaseio.com"
});

const db = admin.database();

const saveUserData = (chatId, from, firstname) => {
  const docRef = db.ref("users/" + chatId);

  docRef.set({
    id: chatId,
    country: from,
    firstname: firstname
  });
};

exports.saveUserData = saveUserData;
