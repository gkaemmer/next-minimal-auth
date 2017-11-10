import fetch from "isomorphic-unfetch";
import cookie from "cookie";

export default async req => {
  const cookies = req ? req.headers.cookie : document.cookie;
  const token = cookie.parse(cookies).jwt;
  const result = await fetch("http://localhost:3004/me", {
    headers: {
      authorization: token && "Bearer " + token
    }
  });
  if (result.status === 401) throw new Error("Unauthorized");
  return result.json();
};
