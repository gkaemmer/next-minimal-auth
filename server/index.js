const cookie = require("cookie");
const { send } = require("micro");
const jwt = require("jsonwebtoken");

const secretKey = "SOME_SECRET_KEY";
const cookieName = "my_jwt_cookie";

module.exports = (req, res) => {
  // Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3003");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "jwt");
  if (req.method === "OPTIONS") return {};

  if (req.url === "/login") {
    // Assume login completed successfully, create JWT
    const payload = {
      sessionId: "Session created at " + new Date().toISOString()
    };
    const token = jwt.sign(payload, secretKey);
    send(res, 200, {
      sessionId: payload.sessionId,
      jwt: token
    });
    return;
  }

  if (req.url === "/me") {
    const token = req.headers.jwt;
    const payload = token && jwt.verify(token, secretKey);
    if (payload) {
      return {
        sessionId: payload.sessionId
      };
    } else {
      send(res, 401, { error: "Not logged in" });
      return;
    }
  }

  send(res, 404, { error: "Not found" });
};
