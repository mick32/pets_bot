var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://petstestbot.firebaseio.com"
});

const db = admin.database();

const db_value = db.ref("users/").once("value", snap => {
  console.log(snap.val());
});

const saveUserData = (chatId, from, firstname) => {
  const docRef = db.ref("users/" + chatId);

  docRef.set({
    id: chatId,
    country: from,
    firstname: firstname
  });
};

exports.saveData = saveData;
