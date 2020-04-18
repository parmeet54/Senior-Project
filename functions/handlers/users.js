const { admin, db } = require("../util/admin");

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

const {
  valiSignup,
  valiLogin,
  valiUserInfo,
  reduceUserDetails,
} = require("../util/vali");

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

  const defaultImage = "defaultImage.png";
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
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${defaultImage}?alt=media`,
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

exports.profileImage = (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: req.headers });

  let imageToBeUploaded = {};
  let imageFileName;
  // String for image token
  //let generatedToken = uuid();

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    //console.log(fieldname, file, filename, encoding, mimetype);
    if (mimetype !== "image/png" && mimetype !== "image/jpeg") {
      return res.status(400).json({ error: "Wrong file type submitted" });
    }
    // my.image.png => ['my', 'image', 'png']
    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    // 32756238461724837.png
    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
            //Generate token to be appended to imageUrl
            //firebaseStorageDownloadTokens: generatedToken,
          },
        },
      })
      .then(() => {
        // Append token to url
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`; //&token=${generatedToken}
        return db.doc(`/users/${req.user.handel}`).update({ imageUrl });
      })
      .then(() => {
        return res.json({ message: "image uploaded successfully" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: "something went wrong" });
      });
  });
  busboy.end(req.rawBody);
};

//edit UserInfo
exports.editUserInfo = (req, res) => {
  let userInfo = valiUserInfo(req.body);
  db.doc(`/users/${req.user.handel}`)
    .update(userInfo)
    .then(() => {
      return res.json({ message: "your profile has been changed" });
    })
    .catch((err) => {
      return res.status(500).json({ error: "Error changing profile" });
    });
};
