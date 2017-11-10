const { send } = require("micro");
const jwt = require("jsonwebtoken");
const uuid = require("uuid/v4");

const secretKey = "SOME_SECRET_KEY";

function jwtFromAuthHeader(header) {
  if (!header) return null;
  return header.split("Bearer ")[1];
}

module.exports = (req, res) => {
  console.log(req.headers);
  if (req.headers.origin) {
    // Allow CORS
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin); // Not safe!
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Authorization");
    if (req.method === "OPTIONS") return {};
  }

  if (req.url === "/login") {
    // Login logic would go here: check passwords, grab access token from
    // oauth provider, etc

    // But let's assume login completed successfully and create JWT
    const user = { id: uuid() };
    const payload = {
      sub: user.id
    };
    const token = jwt.sign(payload, secretKey);
    send(res, 200, {
      user,
      jwt: token
    });
    return;
  }

  if (req.url === "/me") {
    // Get the current user, which
    const token = jwtFromAuthHeader(req.headers.authorization);
    console.log(token);
    const payload = token && jwt.verify(token, secretKey);
    if (payload) {
      return {
        user: { id: payload.sub }
      };
    } else {
      send(res, 401, { error: "Not logged in" });
      return;
    }
  }

  send(res, 404, { error: "Not found" });
};
