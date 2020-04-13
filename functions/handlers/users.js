const { db } = require("../util/admin");

const firebaseConfig = {
  apiKey: "AIzaSyAEs1rhpzDbnxagQOLwFl5LUpqTHZ2XGIo",
  authDomain: "roommate-5923e.firebaseapp.com",
  databaseURL: "https://roommate-5923e.firebaseio.com",
  projectId: "roommate-5923e",
  storageBucket: "roommate-5923e.appspot.com",
  messagingSenderId: "762141443316",
  appId: "1:762141443316:web:7cc16750627b495ba58aa1",
  measurementId: "G-2H80ZW6BN9",
};

const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

const { valiSignup, valiLogin } = require("../util/vali");

exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handel: req.body.handel,
  };

  const { valid, errors } = valiSignup(newUser);
  if (!valid) {
    return res.status(400).json(errors);
  }

  //tested
  //sign up and make sure that username to be unique(PK)
  let token, newUserID;
  db.doc(`/users/${newUser.handel}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        //400: bad request
        return res.status(400).json({
          handel: "This userName/email is already taken/password too short",
        });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      newUserID = data.user.uid;
      return data.user.getIdToken();
    })
    .then((IDtoken) => {
      token = IDtoken;
      const userCredentials = {
        handel: newUser.handel,
        email: newUser.email,
        userID: newUserID,
        createdAt: new Date().toISOString(),
      };
      return db.doc(`/users/${newUser.handel}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        error: "This userName/email is already taken/password too short",
      });
    });

  // firebase
  //   .auth()
  //   .createUserWithEmailAndPassword(newUser.email, newUser.password)
  //   .then((data) => {
  //     return res
  //       .status(201)
  //       .json({ message: `${data.user.uid} has been signed up` });
  //   })
  //   .catch((err) => {
  //     console.error("sign up error");
  //     return res.status(500).json({ error: "signup error" });
  //   });
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  const { valid, errors } = valiLogin(user);
  if (!valid) {
    return res.status(400).json(errors);
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((IDtoken) => {
      return res.json(IDtoken);
    })
    .catch((err) => {
      console.error(err);
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        return res.status(403).json({ general: "Wrong username or password" });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
};
