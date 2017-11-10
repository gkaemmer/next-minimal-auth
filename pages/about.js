import Layout from "./_layout";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Router from "next/router";
import cookie from "cookie";

function redirect(url, res) {
  if (res) {
    res.writeHead(302, {
      Location: url
    });
    res.end();
    res.finished = true;
  } else {
    Router.replace(url);
  }
  return {};
}

export default class About extends React.Component {
  static async getInitialProps({ res, req }) {
    console.log(res);
    let result = await fetch("http://localhost:3004/me", {
      headers: {
        jwt: req
          ? cookie.parse(req.headers.cookie || "").jwt
          : localStorage.getItem("jwt")
      }
    });
    if (result.status === 401) redirect("/", res);
    result = await result.json();
    return { sessionId: result.sessionId };
  }

  render() {
    return (
      <Layout>
        <div>
          About.js<br />
          {this.props.sessionId}
          <br />
          <Link href="/">
            <a>Index</a>
          </Link>
        </div>
      </Layout>
    );
  }
}
