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
app.post("/postNew", FBAuth, postNew);
app.delete("/getAllPosts/:postID/", FBAuth, deletePost);
app.get("/getAllPosts/:postID", getPost);
app.post("/postNew/:postID/message", FBAuth, addMessage);
app.get("/postNew/:postID/match", FBAuth, match);
app.get("/postNew/:postID/unmatch", FBAuth, unmatch);

//signup and login route
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/profileImage", FBAuth, profileImage);
app.post("/user", FBAuth, editUserInfo);
app.get("/user", FBAuth, getUserProfile);

// https://url/api/...
exports.api = functions.https.onRequest(app);
