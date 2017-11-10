import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Router from "next/router";
import authenticate from "./_authenticate";

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
    try {
      const { user } = await authenticate(req);
      return { user };
    } catch (e) {
      redirect("/", res);
      return {};
    }
  }

  render() {
    return (
      <div>
        About.js<br />
        {this.props.user.id}
        <br />
        <Link href="/">
          <a>Index</a>
        </Link>
      </div>
    );
  }
}
