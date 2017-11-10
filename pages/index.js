import Layout from "./_layout";
import Link from "next/link";
import fetch from "isomorphic-unfetch";

async function login() {
  let result = await fetch("http://localhost:3004/login", {
    credentials: "include"
  });
  result = await result.json();
  const jwt = result.jwt;
  localStorage.setItem("jwt", jwt);
  document.cookie = "jwt=" + jwt;
  return result;
}

export default () => (
  <Layout>
    <div>
      Index.js<br />
      <button onClick={login}>Login</button>
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
  </Layout>
);
