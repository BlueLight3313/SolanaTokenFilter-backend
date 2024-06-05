const indexView = (req, res) => {
  res.send({
    message:
      "welcome RestAPI to service images assets database for bakergun games(https://github.com/sanengineer/bakergun-frontend, this backend service build without RDBMS",
    creator: "https://github.com/sanengineer",
  });
};

module.exports = {
  indexView,
};
