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

const getPhotoAndFact = async pet => {
  const factUrl = `https://some-random-api.ml/facts/${pet}`;
  const photoUrl = `https://some-random-api.ml/img/${pet}`;

  const photo = await fetch(photoUrl)
    .then(response => response.json())
    .catch(error => console.error(error));

  const fact = await fetch(factUrl)
    .then(response => response.json())
    .catch(error => console.error(error));

  return { photo: photo.link, fact: fact.fact }; //to do: FACT NAMING!!!
};

exports.getPhotoAndFact = getPhotoAndFact;
