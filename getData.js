const fetch = require("node-fetch");

async function getImage(pet) {
  const url = {
    dog: "https://some-random-api.ml/img/dog",
    cat: "https://some-random-api.ml/img/cat",
    panda: "https://some-random-api.ml/img/panda"
  };

  const data = await fetch(url[pet])
    .then(response => response.json())
    .catch(error => console.error(error));

  return data.link;
}

async function getFact(pet) {
  const url = {
    dog: "https://some-random-api.ml/facts/dog",
    cat: "https://some-random-api.ml/facts/cat",
    panda: "https://some-random-api.ml/facts/panda"
  };

  const data = await fetch(url[pet])
    .then(response => response.json())
    .catch(error => console.error(error));

  return data.fact;
}

exports.getImage = getImage;
exports.getFact = getFact;
