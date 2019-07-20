const fetch = require("node-fetch");

function getImage(obj) {
  const url = {
    dog: "https://some-random-api.ml/img/dog",
    cat: "https://some-random-api.ml/img/cat",
    panda: "https://some-random-api.ml/img/panda"
  };

  return fetch(url[obj])
    .then(response => response.json())
    .catch(error => console.error(error));
}

function getFact(obj) {
  const url = {
    dog: "https://some-random-api.ml/facts/dog",
    cat: "https://some-random-api.ml/facts/cat",
    panda: "https://some-random-api.ml/facts/panda"
  };

  return fetch(url[obj])
    .then(response => response.json())
    .catch(error => console.error(error));
}

exports.getImage = getImage;
exports.getFact = getFact;
