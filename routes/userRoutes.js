const express = require("express");
const router = express.Router();
const db = require("../db");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const md5 = require("hash-wasm").md5;
const LRU = require("lru-cache");

const cache = new LRU({ maxAge: 1000 * 60 * 60 })

router.post("/login", async (req, res) => {
  let query = `SELECT id, username, email, password, status FROM users WHERE username ILIKE $1 OR email ILIKE $1`;
  let values = [req.body.username];
  let result = await db.query(query, values);
  let response;
  if (result.rowCount > 0) {
    let check = bcrypt.compareSync(req.body.password, result.rows[0].password);
    if (check) {
      let token = jwt.sign({ id: result.rows[0].id, status: result.rows[0].status }, process.env.JWT_SECRET, { expiresIn: "7d" });
      md5(token).then(hash => setSession(result.rows[0].id, hash));
      res.cookie("session", token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 });
      response = { msg: "Success", user: createUser(result.rows[0]) };
    } else {
      response = { error: true, msg: "Incorrect password" }
    }
  } else {
    response = { error: true, msg: "Incorrect email/username" };
  }
  res.json(response);
});

router.post("/register", async (req, res) => {
  let query = `SELECT id, username, email FROM users WHERE username ILIKE $1 OR email ILIKE $2`;
  let values = [req.body.username, req.body.email];
  let result = await db.query(query, values);
  if (result.rowCount > 0) {
    // already registered
    res.json({ error: true, msg: "Email/Username already registered" });
  } else {
    let hash = await bcrypt.hash(req.body.password, 10);
    query = `INSERT INTO users(username, password, email, date, status, trophies) VALUES($1, $2, $3, NOW(), 0, '{1}') RETURNING id`;
    values = [req.body.username, hash, req.body.email];
    result = await db.query(query, values);

    let token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    md5(token).then(jwtHash => setSession(result.rows[0].id, jwtHash));
    res.cookie("session", token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 });
    res.json({ user: { id: result.rows[0].id, username: req.body.username, status: 0 }});
  }
});

router.post("/tokenLogin", async (req, res) => {
  if (req.cookies.session) {
    try {
      let decoded = await jwt.verify(req.cookies.session, process.env.JWT_SECRET);
      let query = `SELECT id, username, email, session, status FROM users WHERE id = $1`;
      let values = [decoded.id];
      let result = await db.query(query, values);
      if (result.rowCount === 1 && await md5(req.cookies.session) === result.rows[0].session) {
        if (result.rows[0].status !== decoded.status) {
          let token = jwt.sign({ id: result.rows[0].id, status: result.rows[0].status }, process.env.JWT_SECRET, { expiresIn: "7d" });
          md5(token).then(hash => setSession(result.rows[0].id, hash));
          res.cookie("session", token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 });
        }
        res.json({ auth: true, user: createUser(result.rows[0]) });
      } else {
        res.json({ auth: false });
      }
    } catch (e) {
      res.json({ auth: false });
    }
  } else {
    res.json({ auth: false });
  }
});

router.post("/logout", (req, res) => {
  if (req.cookies.session) {
    res.cookie("session", "expired", {httpOnly: true, maxAge: -1});
  }
  res.status(204).end();
});

router.post("/forgot", async (req, res) => {
  let query = `SELECT email FROM users WHERE email ILIKE $1`;
  let values = [req.body.email];
  let result = await db.query(query, values);
  if (result.rowCount > 0) {
    let random = crypto.randomBytes(20).toString("hex");
    cache.set(req.body.email, random);
    await db.sendEmail(req.body.email, random);
    res.status(200).end();
  } else {
    res.status(400).end();
  }
});

router.post("/reset", async (req, res) => {
  if (!req.body.email || !req.body.code) return res.status(400).end();
  let code = cache.get(req.body.email);
  if (code === req.body.code) {
    let hash = await bcrypt.hash(req.body.password, 10);
    let query = `UPDATE users SET password = $1 WHERE email ILIKE $2`;
    let values = [hash, req.body.email];
    await db.query(query, values);
    cache.del(req.body.email);
    res.status(200).end();
  } else {
    res.status(400).end();
  }
});

function createUser(row) {
  return { id: row.id, username: row.username, status: row.status };
}

function setSession(id, token) {
  let query = `UPDATE users SET session = $1 WHERE id = $2`;
  let values = [token, id];
  void db.query(query, values);
}

module.exports = router;
