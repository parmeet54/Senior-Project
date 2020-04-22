const functions = require("firebase-functions");
const app = require("express")();

const FBAuth = require("./util/fbAuth");
const { db } = require("./util/admin");

const { getAllScreams, postOneScream } = require("./handlers/screams");
const {
  signup,
  login,
  profileImage,
  editUserInfo,
  getUserProfile,
  getOtherUsers,
  setNotoficationsRead,
} = require("./handlers/users");

const {
  getAllPosts,
  postNew,
  getPost,
  addMessage,
  match,
  unmatch,
  deletePost,
} = require("./handlers/matchPosts");

//Get and POST to database
app.get("/screams", getAllScreams);
app.post("/scream", FBAuth, postOneScream);

//posts routes
app.get("/getAllPosts", getAllPosts);
app.delete("/getAllPosts/:postID/", FBAuth, deletePost);
app.get("/getAllPosts/:postID", getPost);

app.post("/postNew", FBAuth, postNew);
app.post("/postNew/:postID/message", FBAuth, addMessage);
app.get("/postNew/:postID/match", FBAuth, match);
app.get("/postNew/:postID/unmatch", FBAuth, unmatch);

//signup and login route
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/profileImage", FBAuth, profileImage);
app.post("/user", FBAuth, editUserInfo);
app.get("/user", FBAuth, getUserProfile);
app.get("/user/:handel", getOtherUsers);
app.post("/notifications", FBAuth, setNotoficationsRead);
// https://url/api/...
exports.api = functions.https.onRequest(app);

exports.matchNotification = functions.firestore
  .document("matches/{postID}")
  .onCreate((snapshot) => {
    return db
      .doc(`matchPosts/${snapshot.data().postID}`)
      .get()
      .then((doc) => {
        if (doc.exists && doc.data().userName !== snapshot.data().userName) {
          return db.doc(`notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            sender: snapshot.data().userName,
            getter: doc.data().userName,
            type: "match",
            read: false,
            postID: doc.id,
          });
        }
      })

      .catch((err) => {
        return;
      });
  });

exports.messageNotification = functions.firestore
  .document("/message/{id}")
  .onCreate((snapshot) => {
    return db
      .doc(`matchPosts/${snapshot.data().postID}`)
      .get()
      .then((doc) => {
        if (doc.exists && doc.data().userName !== snapshot.data().userName) {
          return db.doc(`notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            sender: snapshot.data().userName,
            getter: doc.data().userName,
            type: "message",
            read: false,
            postID: snapshot.id,
          });
        }
      })
      .catch((err) => {
        return;
      });
  });

exports.removeNotification = functions.firestore
  .document("matches/{id}")
  .onDelete((snapshot) => {
    return db
      .doc(`/notifications/${snapshot.id}`)
      .delete()
      .catch((err) => {
        return;
      });
  });
