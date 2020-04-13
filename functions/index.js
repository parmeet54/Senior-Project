const functions = require("firebase-functions");
const app = require("express")();

const FBAuth = require("./util/fbAuth");
const { db } = require("./util/admin");

const { getAllScreams, postOneScream } = require("./handlers/screams");
const { signup, login } = require("./handlers/users");

//Get and POST to database
app.get("/screams", getAllScreams);
app.post("/scream", FBAuth, postOneScream);

//signup and login route
app.post("/signup", signup);
app.post("/login", login);

// https://url/api/...
exports.api = functions.https.onRequest(app);
