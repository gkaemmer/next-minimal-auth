# Next Minimal Auth

This project demonstrates a very small amount of code to allow Next.js authenticate requests on both the server and the client. This is done by saving a JWT in a cookie on the Next.js host.

The JWT is created by a separate Micro server (`server/index.js`).

The Next app has two pages.
1. `index.js`, where the user can login and logout.
2. `about.js`, which requires the user to be logged in (and redirects to `/index` if not).

The Micro server has two methods. The idea would be to replace this with your own, smarter auth server.
1. `/login`, which always succeeds and returns `{ jwt: "...", user: { id: "..." } }`.
2. `/me`, which only succeeds if there is an `Authorization: Bearer ...` header with a valid JWT.

## Running locally

To start the Next.js server:
```
yarn
next dev
```

To start the Micro server:
```
cd server/
yarn
micro-dev -p 3004     # localhost:3004 is the default server address
```
