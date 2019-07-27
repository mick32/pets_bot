const fetch = require("node-fetch");

const getImage = async pet => {
  const url = `https://some-random-api.ml/img/${pet}`;

  const data = await fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));

  return data.link;
};

const getFact = async pet => {
  const url = `https://some-random-api.ml/facts/${pet}`;

  const data = await fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));

  return data.fact;
};

exports.getImage = getImage;
exports.getFact = getFact;
