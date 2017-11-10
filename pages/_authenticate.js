import fetch from "isomorphic-unfetch";
import cookie from "cookie";

// Isomorphic function to get a user from an auth server
export default async req => {
  const cookies = req ? req.headers.cookie : document.cookie;
  const token = cookie.parse(cookies).jwt;
  const result = await fetch("http://localhost:3004/me", {
    headers: {
      authorization: token && "Bearer " + token
    }
  });
  if (result.status === 401) return undefined;
  const { user } = result.json();
  return user;
};
