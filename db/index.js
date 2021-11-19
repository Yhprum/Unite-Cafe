const { Pool } = require('pg');
const options = {
  connectionString: process.env.DATABASE_URL
};
if (process.env.NODE_ENV === "production") {
  options.ssl = {
    rejectUnauthorized: false
  }
}
const pool = new Pool(options);

const nodemailer = require("nodemailer");
const key = require("./key.json");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: "admin@unite-cafe.com",
    serviceClient: key.client_id,
    privateKey: key.private_key
  },
});

module.exports = {
  async query(text, params) {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, params, duration, rows: res.rowCount });
    return res;
  },
  async getClient() {
    const client = await pool.connect();
    const query = client.query;
    const release = client.release;
    // set a timeout of 5 seconds, after which we will log this client's last query
    const timeout = setTimeout(() => {
      console.error('A client has been checked out for more than 5 seconds!');
      console.error(`The last executed query on this client was: ${client.lastQuery}`);
    }, 5000);
    // monkey patch the query method to keep track of the last query executed
    client.query = (...args) => {
      client.lastQuery = args;
      return query.apply(client, args);
    };
    client.release = () => {
      // clear our timeout
      clearTimeout(timeout);
      // set the methods back to their old un-monkey-patched version
      client.query = query;
      client.release = release;
      return release.apply(client);
    };
    return client;
  },
  async sendEmail(recipient, code) {
    try {
      let body = `Click the link below to change your password\n\nhttps://www.unite-cafe.com/reset?email=${recipient}&code=${code}`;
      await transporter.sendMail({
        from: "admin@unite-cafe.com",
        to: recipient,
        subject: "Password reset link",
        text: body
      });
    } catch (e) {
      console.log(e);
    }
  }
};