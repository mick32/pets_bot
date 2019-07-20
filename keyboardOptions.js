const DefaultKeyboad = {
  reply_markup: {
    keyboard: [["Get dog 🐶", "Get cat 🐱", "Get panda 🐼"]],
    resize_keyboard: true
  }
};

const removeKeyboard = {
  reply_markup: {
    remove_keyboard: true
  }
};

exports.DefaultKeyboad = DefaultKeyboad;
exports.removeKeyboard = removeKeyboard;
