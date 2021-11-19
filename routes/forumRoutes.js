const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../db");
const auth = require("../auth");
const modAuth = require("../modauth");

/**
 * Get details for a category
 * @param category - the category to get details for
 * @return details for the category
 */
router.get("/threads/:category/details", async function (req, res) {
  if (!req.params.category) return res.status(400).end();
  let query = `
    SELECT *, COUNT(*) OVER(PARTITION BY row) FROM (
      SELECT  ROW_NUMBER() OVER(PARTITION BY threads.id ORDER BY posts.timestamp DESC) AS row,
        users.username, posts.timestamp, threads.id, threads.title FROM posts
      JOIN threads ON threads.id = thread_fk
      JOIN users ON users.id = posts.user_fk
      WHERE threads.category = $1
      ORDER BY posts.timestamp DESC
    ) AS dt
    WHERE row = 1
    LIMIT 1;
  `;
  let details = await db.query(query, [req.params.category]);
  res.json(details.rows[0]);
});

/**
 * Get all threads in a category
 * @param category - the category of threads to return
 * @return all thread objects with the given category
 */
router.get("/threads/:category", async function (req, res) {
  if (!req.params.category) return res.status(400).end();
  let query = `
    SELECT * FROM (
      SELECT ROW_NUMBER() OVER (PARTITION BY thread_fk ORDER BY posts.timestamp DESC) AS rn, COUNT(*) OVER (PARTITION BY thread_fk) AS count,
      posts.timestamp as lastpost, threads.id, threads.title, threads.timestamp, threads.pinned, threads.locked, post_user.username as lastuser, thread_user.username
        FROM posts
        JOIN threads ON threads.id = thread_fk
        JOIN users AS post_user ON post_user.id = posts.user_fk
        JOIN users AS thread_user ON thread_user.id = threads.user_fk
        WHERE category = $1
        ORDER BY pinned, posts.timestamp DESC
    ) dt
    WHERE rn = 1
  `;
  let threads = await db.query(query, [req.params.category]);
  res.json(threads.rows);
});

/**
 * Get a thread by id
 * @param threadId - the id of the thread to return
 * @return single thread object
 */
router.get("/thread/:threadId", async function (req, res) {
  if (!req.params.threadId) return res.status(400).end();
  let userId = 0;
  if (req.cookies.session) {
    try {
      userId = jwt.verify(req.cookies.session, process.env.JWT_SECRET).id;
    } catch (e) {
      // lol
    }
  }
  let query = `
     SELECT title, threads.timestamp, username, postcount, locked, category, follows.thread_fk IS NOT NULL AS subscribed FROM threads
     JOIN users ON user_fk = users.id
     LEFT JOIN follows ON threads.id = follows.thread_fk AND follows.user_fk = $1
     JOIN (SELECT thread_fk, COUNT(thread_fk) AS postcount FROM posts GROUP BY thread_fk) AS dt ON dt.thread_fk = threads.id
     WHERE threads.id = $2
  `;
  let threads = await db.query(query, [userId, req.params.threadId]);
  res.json(threads.rows[0]);
});

/**
 * Get all posts for a thread
 * @param threadId - id number of the thread
 * @param pageNumber - page number (page size of 25 posts per page)
 * @return thread object and array of all post objects with the given thread id
 */
router.get("/posts/:threadId/:pageNumber?", async function (req, res) {
  if (!req.params.threadId) return res.status(400).end();

  let userId = 0;
  if (req.cookies.session) {
    try {
      userId = jwt.verify(req.cookies.session, process.env.JWT_SECRET).id;
    } catch (e) {
      // lol
    }
  }
  let query = `
    SELECT posts.id AS postId, content, timestamp, last_edited AS edit, users.id AS userId, username, users.main AS avatar, users.status, users.signature, l2.user_fk as liked, COUNT(l1.post_fk) as likes FROM posts
      JOIN users on user_fk = users.id
      LEFT JOIN likes l1 on posts.id = l1.post_fk
      LEFT JOIN likes l2 on posts.id = l2.post_fk AND l2.user_fk = $1
      WHERE thread_fk = $2
      GROUP BY postId, timestamp, users.id, l2.user_fk, l1.post_fk
      ORDER BY timestamp
      LIMIT 25 OFFSET $3
    `;
  let pageNumber = (req.params.pageNumber || 1) - 1;
  let threads = await db.query(query, [userId, req.params.threadId, pageNumber * 25]);
  res.json(threads.rows);
});

/**
 * Create a new thread
 * @param category - the category of threads to add new thread to
 * @body title - the title of the new thread
 * @body message - the content of the first post
 */
router.post("/threads/:category/new", auth, async function (req, res) {
  if (!req.params.category || !req.body.title || !req.body.message) return res.status(400).end();
  let decoded = jwt.verify(req.cookies.session, process.env.JWT_SECRET);
  let values = [req.params.category, req.body.title, decoded.id];
  try {
    let thread = await db.query("INSERT INTO threads(category, title, timestamp, user_fk) VALUES($1, $2, NOW(), $3) RETURNING id", values);
    values = [req.body.message, thread.rows[0].id, decoded.id];
    await db.query("INSERT INTO posts(content, timestamp, thread_fk, user_fk) VALUES($1, NOW(), $2, $3)", values);
    res.json({ threadId: thread.rows[0].id });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

/**
 * Reply to a thread
 * @param threadId - id number of the thread
 * @body message - the content of the reply
 */
router.post("/posts/:threadId/reply", auth, async function (req, res) {
  if (!req.params.threadId || !req.body.message) return res.status(400).end();
  if (!req.cookies.session) return res.send(401);
  let decoded = jwt.verify(req.cookies.session, process.env.JWT_SECRET);
  let values = [req.body.message, req.params.threadId, decoded.id];
  try {
    await db.query("INSERT INTO posts(content, timestamp, thread_fk, user_fk) VALUES($1, NOW(), $2, $3)", values);
    values = [req.params.threadId, decoded.id];
    await db.query("UPDATE follows SET timestamp = NOW(), unread = true WHERE thread_fk = $1 AND user_fk != $2", values);
    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

/**
 * Edit a post
 * @param postId - id number of the post to edit
 * @body message - the content of the reply
 */
router.post("/posts/:postId/edit", auth, async function (req, res) {
  if (!req.params.postId) return res.status(400).end();
  let decoded = jwt.verify(req.cookies.session, process.env.JWT_SECRET);
  let query = `UPDATE posts SET content = $1, last_edited = NOW() WHERE id = $2`;
  let values = [req.body.message, req.params.postId];
  if (decoded.status !== 9){
    query += ` AND user_fk = $3`;
    values.push(decoded.id);
  }
  let threads = await db.query(query, values);
  res.json(threads.rows);
});

/**
 * Like a post
 * @param postId - id number of the post to like
 */
router.post("/posts/:postId/like", auth, async function (req, res) {
  if (!req.params.postId) return res.status(400).end();
  let decoded = jwt.verify(req.cookies.session, process.env.JWT_SECRET);
  let query = `INSERT INTO likes(post_fk, user_fk) VALUES($1, $2)`;
  let values = [req.params.postId, decoded.id];
  try {
    await db.query(query, values);
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
});

/**
 * Unlike a post
 * @param postId - id number of the post to unlike
 */
router.post("/posts/:postId/unlike", auth, async function (req, res) {
  if (!req.params.postId) return res.status(400).end();
  let decoded = jwt.verify(req.cookies.session, process.env.JWT_SECRET);
  let query = `DELETE FROM likes WHERE post_fk = $1 AND user_fk = $2`;
  let values = [req.params.postId, decoded.id];
  try {
    await db.query(query, values);
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
});

/**
 * Edit a post
 * @param postId - id number of the post to edit
 * @body message - the content of the reply
 */
router.delete("/posts/:postId", auth, async function (req, res) {
  if (!req.params.postId) return res.status(400).end();
  let decoded = jwt.verify(req.cookies.session, process.env.JWT_SECRET);
  let query = `DELETE FROM posts WHERE id = $1`;
  let values = [req.params.postId];
  if (decoded.status !== 9 && decoded.status !== 8) {
    query += ` AND user_fk = $2`;
    values.push(decoded.id);
  }
  try {
    await db.query(query, values);
    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

/**
 * Report a post
 * @param threadId - id number of the post
 * @body message - the content of the report message
 */
router.post("/posts/:postId/report", auth, async function (req, res) {
  if (!req.params.postId) return res.status(400).end();
  if (!req.cookies.session) return res.send(401);
  let decoded = jwt.verify(req.cookies.session, process.env.JWT_SECRET);
  let values = [req.body.reason, req.params.postId, decoded.id];
  try {
    await db.query("INSERT INTO reports(message, timestamp, post_fk, user_fk) VALUES($1, NOW(), $2, $3)", values);
    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

/**
 * Get reported posts
 * @return all reported posts
 */
router.get("/reports", modAuth, async function (req, res) {
  let query = `
     SELECT message, posts.content, post_user.username, report_user.username AS reportedby FROM reports
     JOIN posts ON post_fk = posts.id
     JOIN users AS report_user ON reports.user_fk = report_user.id
     JOIN users AS post_user ON posts.user_fk = post_user.id
     ORDER BY reports.timestamp DESC
  `;
  let reports = await db.query(query);
  res.json(reports.rows);
});

/**
 * Search for users by username
 * @return all users like the search query
 */
router.get("/users/search/:username?", async function (req, res) {
  let query = `SELECT username FROM users WHERE username ILIKE $1`;
  let user = await db.query(query, [(req.params.username || "") + "%"]);
  res.json(user.rows);
});

/**
 * Get a specific user by username
 * @return the user
 */
router.get("/users/:username", async function (req, res) {
  let query = `
     SELECT users.id, username, date, status, quote, location, main, birthday, website, trophies, signature, COUNT(posts.user_fk) as posts, COUNT(likes.user_fk) as likes FROM users
     LEFT JOIN posts on users.id = posts.user_fk
     LEFT JOIN likes on posts.id = likes.post_fk
     WHERE username = $1
     GROUP BY users.id, users.username, users.date, users.status, users.quote, users.location, users.main, users.birthday, users.website, users.trophies
  `;
  let user = await db.query(query, [req.params.username]);
  if (user.rowCount === 0) {
    res.status(404).end();
  } else {
    res.json(user.rows[0]);
  }
});

/**
 * Edit a user profile
 * @body status - user profile quote
 * @body location - user location
 * @body main - user's main pokemon
 * @body birthday - user birthday
 * @body website - user website
 */
router.post("/users/:userId/edit", async function (req, res) {
  let userId = 0;
  if (req.cookies.session) {
    try {
      userId = jwt.verify(req.cookies.session, process.env.JWT_SECRET).id;
      if (userId !== parseInt(req.params.userId)) {
        return res.status(401).end();
      }
    } catch (e) {
      return res.status(401).end();
    }
  }
  let query = `UPDATE users SET quote = $1, location = $2, main = $3, birthday = $4, website = $5 WHERE id = $6`;
  let values = [req.body.status || null, req.body.location || null, req.body.main || null, req.body.birthday || null, req.body.website || null, req.params.userId];
  try {
    await db.query(query, values);
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
});

/**
 * Edit a user signature
 * @body signature
 */
router.post("/users/:userId/signature", async function (req, res) {
  let userId = 0;
  if (req.cookies.session) {
    try {
      userId = jwt.verify(req.cookies.session, process.env.JWT_SECRET).id;
      if (userId !== parseInt(req.params.userId)) {
        return res.status(401).end();
      }
    } catch (e) {
      return res.status(401).end();
    }
  }
  let query = `UPDATE users SET signature = $1 WHERE id = $2`;
  let values = [req.body.signature, req.params.userId];
  try {
    await db.query(query, values);
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
});

/**
 * Get recent posts from a user
 * @return most recent posts by user
 */
router.get("/users/:username/posts", async function (req, res) {
  let query = `
    SELECT content, posts.timestamp, title, thread_fk FROM posts
    JOIN threads on threads.id = thread_fk
    JOIN users on users.id = posts.user_fk
    WHERE users.username = $1
    ORDER BY timestamp DESC LIMIT 5;
  `;
  let user = await db.query(query, [req.params.username]);
  res.json(user.rows);
});

/**
 * Subscribe a thread's updates
 * @param threadId - id number of the thread
 * @body stop - unsubscribe instead
 */
router.post("/threads/:threadId/subscribe", async function (req, res) {
  if (!req.params.threadId) return res.status(400).end();
  if (!req.cookies.session) return res.send(401);
  try {
    let decoded = jwt.verify(req.cookies.session, process.env.JWT_SECRET);
    let query = "INSERT INTO follows(user_fk, thread_fk, unread) VALUES($1, $2, false)";
    if (req.body.stop) {
      query = "DELETE FROM follows WHERE user_fk = $1 AND thread_fk = $2";
    }
    let values = [decoded.id, req.params.threadId];
    await db.query(query, values);
    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

/**
 * Get notifications for a user
 * @return all notifications
 */
router.get("/notifications", async function (req, res) {
  let userId;
  try {
    userId = jwt.verify(req.cookies.session, process.env.JWT_SECRET).id;
  } catch (e) {
    return res.status(401).end();
  }
  let query = `
    SELECT follows.timestamp, threads.id AS threadId, threads.title FROM follows
    JOIN threads ON threads.id = thread_fk
    WHERE follows.user_fk = $1
    AND unread = true
    ORDER BY timestamp DESC
   `;
  let result = await db.query(query, [userId]);
  res.json(result.rows);
});

/**
 * Read a notification
 * @param threadId - id of the thread to clear
 */
router.post("/notifications/:id/read", async function (req, res) {
  let userId;
  try {
    userId = jwt.verify(req.cookies.session, process.env.JWT_SECRET).id;
  } catch (e) {
    return res.status(401).end();
  }
  await db.query("UPDATE follows SET unread = false WHERE thread_fk = $1 AND user_fk = $2", [req.params.id, userId]);
  res.status(200).end();
});

/**
 * Get dms sent to the user
 * @return all dms
 */
router.get("/messages", async function (req, res) {
  let userId;
  try {
    userId = jwt.verify(req.cookies.session, process.env.JWT_SECRET).id;
  } catch (e) {
    return res.status(401).end();
  }

  const folder = req.query.folder || "inbox"
  let query = "";

  if (folder === "inbox") {

    query = `
    SELECT subject, messages.id, timestamp, users.username AS sender, users.main AS icon, read FROM messages
    JOIN users ON users.id = sender_fk
    WHERE recipient_fk = $1
    AND deleted IS NOT true
    ORDER BY timestamp DESC
    `;
  } else if (folder === "outbox") {
    query = `
    SELECT subject, messages.id, timestamp, users.username AS recipient, users.main AS icon, read FROM messages
    JOIN users ON users.id = recipient_fk
    WHERE sender_fk = $1
    ORDER BY timestamp DESC
    `;
  }
  let result = await db.query(query, [userId]);
  res.json(result.rows);
});

/**
 * Delete an array of messages
 * @messages array of message ids to delete
 */
router.post("/messages/delete", async function (req, res) {
  let userId;
  try {
    userId = jwt.verify(req.cookies.session, process.env.JWT_SECRET).id;
  } catch (e) {
    return res.status(401).end();
  }
  let ids = Array.isArray(req.body.messages) ? req.body.messages : [req.body.messages];
  let query = `UPDATE messages SET deleted = true WHERE id = ANY ($1) AND recipient_fk = $2`;
  await db.query(query, [ids, userId]);
  return res.status(200).end();
});

/**
 * Read/unread an array of messages
 * @body messages array of message ids to mark as read/unread
 * @body read boolean if setting read or unread
 */
router.post("/messages/read", async function (req, res) {
  let userId;
  try {
    userId = jwt.verify(req.cookies.session, process.env.JWT_SECRET).id;
  } catch (e) {
    return res.status(401).end();
  }
  let ids = Array.isArray(req.body.messages) ? req.body.messages : [req.body.messages];
  let query = `UPDATE messages SET read = $1 WHERE id = ANY ($2) AND recipient_fk = $3`;
  await db.query(query, [req.body.read, ids, userId]);
  return res.status(200).end();
});

/**
 * Get a single message
 * @return the message
 */
router.get("/messages/:id", async function (req, res) {
  let userId;
  try {
    userId = jwt.verify(req.cookies.session, process.env.JWT_SECRET).id;
  } catch (e) {
    return res.status(401).end();
  }
  let query = `
    SELECT subject, message, timestamp, users.username AS sender, users.main AS icon, read FROM messages
    JOIN users ON users.id = sender_fk
    WHERE messages.id = $1
    AND (
      (recipient_fk = $2 AND deleted IS NOT true)
      OR (sender_fk = $2) 
    )
  `;
  let result = await db.query(query, [req.params.id, userId]);
  res.json(result.rows[0]);
});

/**
 * Send a dm
 * @body message
 * @body recipient
 */
router.post("/messages/send", async function (req, res) {
  let userId;
  try {
    userId = jwt.verify(req.cookies.session, process.env.JWT_SECRET).id;
  } catch (e) {
    return res.status(401).end();
  }
  try {
    let query = `
      INSERT INTO messages(subject, message, timestamp, sender_fk, recipient_fk)
      SELECT $1, $2, NOW(), $3, id FROM users WHERE username ILIKE $4
    `;
    await db.query(query, [req.body.subject, req.body.message, userId, req.body.recipient]);
    res.status(200).end();
  } catch (e) {
    return res.status(400).end();
  }
});

module.exports = router;
