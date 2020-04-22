const { db } = require("../util/admin");

//get all match posts
exports.getAllPosts = (req, res) => {
  db.collection("matchPosts")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let matchPosts = [];
      data.forEach((doc) => {
        // include id
        matchPosts.push({
          postId: doc.id,
          body: doc.data().body,
          userName: doc.data().userName,
          createdAt: doc.data().createdAt,
          imageUrl: doc.data().imageUrl,
          matchCount: doc.data().matchCount,
          commentCount: doc.data().commentCount,
        });
      });
      return res.json(matchPosts);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

//new post
exports.postNew = (req, res) => {
  // if (req.body.body.trim() === "") {
  //   return res.status(400).json({ body: "Body must not be empty" });
  // }
  const newPost = {
    body: req.body.body,
    userName: req.user.handel,
    imageUrl: req.user.imageUrl,
    matchCount: 0,
    commentCount: 0,
    createdAt: new Date().toISOString(),
  };
  db.collection("matchPosts")
    .add(newPost)
    .then((doc) => {
      const postResult = newPost;
      postResult.postID = doc.id;
      res.json(postResult);
    })
    .catch((err) => {
      //500 server error,
      res.status(500).json({ error: "post error" });
      //console.error("post error");
    });
};

//fetch a post along with its messages
exports.getPost = (req, res) => {
  let postDetail = {};
  db.doc(`/matchPosts/${req.params.postID}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Post not found" });
      }
      postDetail = doc.data();
      postDetail.postID = doc.id;
      return db
        .collection("message")
        .orderBy("createdAt", "desc")
        .where("postID", "==", req.params.postID)
        .get();
    })
    .then((data) => {
      postDetail.message = [];
      data.forEach((doc) => {
        postDetail.message.push(doc.data());
      });
      return res.json(postDetail);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

//add a new message to a post
exports.addMessage = (req, res) => {
  //prevent a empty message
  if (req.body.body.trim() === "") {
    return res.status(400).json({ error: "message is empty" });
  }
  const newMessage = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    userName: req.user.handel,
    postID: req.params.postID,
    imageUrl: req.user.imageUrl,
  };

  //ensure the post is still a valid
  db.doc(`/matchPosts/${req.params.postID}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "The post can not be found" });
      }

      return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
    })
    .then(() => {
      return db.collection("message").add(newMessage);
    })
    .then(() => {
      res.json(newMessage);
    })
    .catch((err) => {
      res.status(500).json({ error: "error, sending a new message" });
    });
};

//match to a post(user)
exports.match = (req, res) => {
  const matchDetail = db
    .collection("matches")
    .where("userName", "==", req.user.handel)
    .where("postID", "==", req.params.postID)
    .limit(1);

  const postDetail = db.doc(`/matchPosts/${req.params.postID}`);

  let postData;

  postDetail
    .get()
    .then((doc) => {
      if (doc.exists) {
        postData = doc.data();
        postData.postID = doc.id;
        return matchDetail.get();
      } else {
        return res.status(404).json({ error: "Post can not be found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("matches")
          .add({
            postID: req.params.postID,
            userName: req.user.handel,
          })
          .then(() => {
            postData.matchCount++;
            return postDetail.update({ matchCount: postData.matchCount });
          })
          .then(() => {
            return res.json(postData);
          });
      } else {
        return res
          .status(400)
          .json({ error: "already matched with this user" });
      }
    })
    .catch((err) => {
      //console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.unmatch = (req, res) => {
  const matchDetail = db
    .collection("matches")
    .where("userName", "==", req.user.handel)
    .where("postID", "==", req.params.postID)
    .limit(1);

  const postDetail = db.doc(`/matchPosts/${req.params.postID}`);

  let postData;

  postDetail
    .get()
    .then((doc) => {
      if (doc.exists) {
        postData = doc.data();
        postData.postID = doc.id;
        return matchDetail.get();
      } else {
        return res.status(404).json({ error: "Post can not be found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res
          .status(400)
          .json({ error: "has not matched with this user" });
      } else {
        return db
          .doc(`/matches/${data.docs[0].id}`)
          .delete()
          .then(() => {
            postData.matchCount--;
            return postDetail.update({ matchCount: postData.matchCount });
          })
          .then(() => {
            res.json(postData);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

//delete posts
exports.deletePost = (req, res) => {
  const postDoc = db.doc(`/matchPosts/${req.params.postID}`);
  postDoc
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Post not found" });
      }
      if (doc.data().userName !== req.user.handel) {
        return res.status(403).json({ error: "Unauthorized" });
      } else {
        return postDoc.delete();
      }
    })
    .then(() => {
      res.json({ message: "Post has been deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
