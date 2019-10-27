const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://petstestbot.firebaseio.com"
});

const db = admin.database();

const saveUserData = (chatId, from, firstname) => {
  const docRef = db.ref("users/" + chatId);
  const date = new Date().toLocaleDateString("ru-RU");

  docRef.set({
    id: chatId,
    country: from,
    firstname: firstname,
    last_usage: date
  });
};

const saveUserClick = pet => {
  const date = new Date().toLocaleDateString();
  const docRef = db.ref(`analytics/${date}`);

  docRef.transaction(currentData => {
    if (!currentData) {
      return { [pet]: { clicks: 1 } };
    } else if (currentData && !currentData[pet]) {
      return { ...currentData, [pet]: { clicks: 1 } };
    } else {
      try {
        console.log(currentData);
        const prevClick = currentData[pet].clicks;

        return { ...currentData, [pet]: { clicks: prevClick + 1 } };
      } catch (e) {
        console.log(e);
      }
    }
  });
};

exports.saveUserClick = saveUserClick;
exports.saveUserData = saveUserData;
