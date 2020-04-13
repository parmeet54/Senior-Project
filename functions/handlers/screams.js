const { db } = require("../util/admin");

exports.getAllScreams = (req, res) => {
  db.collection("screams")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        // include id
        screams.push({
          screamID: doc.id,
          body: doc.data().body,
          userHandel: doc.data.userHandel,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(screams);
    })
    .catch((err) => console.error("get error"));
};

exports.postOneScream = (req, res) => {
  if (req.body.body.trim() === "") {
    return res.status(400).json({ body: "Body must not be empty" });
  } //empty
  const newScream = {
    body: req.body.body,
    userHandel: req.user.handel,
    createdAt: new Date().toISOString(),
  };
  db.collection("screams")
    .add(newScream)
    .then((doc) => {
      res.json({ message: `${doc.id} has been created` });
    })
    .catch((err) => {
      //500 server error,
      res.status(500).json({ error: "post error" });
      console.error("post error");
    });
};
