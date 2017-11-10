import Link from "next/link";
import fetch from "isomorphic-unfetch";
import authenticate from "./_authenticate";
import Router from "next/router";
import cookie from "cookie";

async function login() {
  let result = await fetch("http://localhost:3004/login");
  const { jwt } = await result.json();
  // Save JWT to cookie
  document.cookie = "jwt=" + jwt;
  Router.reload("/");
}

function logout() {
  // Expire JWT cookie
  document.cookie = cookie.serialize("jwt", "", {
    expires: new Date(0)
  });
  Router.reload("/");
}

export default class Index extends React.Component {
  static async getInitialProps({ res, req }) {
    try {
      const { user } = await authenticate(req);
      return { user };
    } catch (e) {
      return {};
    }
  }

  render() {
    return (
      <div>
        Index.js<br />
        {this.props.user ? (
          <span>
            Logged in <small>(as user {this.props.user.id})</small>
            <br />
            <button onClick={logout}>Logout</button>
          </span>
        ) : (
          <button onClick={login}>Login</button>
        )}
        <br />
        <Link href="/about">
          <a>About</a>
        </Link>
      </div>
    );
  }
}
