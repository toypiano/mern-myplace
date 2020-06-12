# My Places App - Run 2

## New in this run

- Frontend is included in the backend as its sub-directory.

  - [FullStack setup (Node.js, React.js and MongoDB)](https://dev.to/pacheco/my-fullstack-setup-node-js-react-js-and-mongodb-2a4k)
  - Makes it easier to track the commit history of both frontend and backend together.

- Uses Place API instead of geocoding

  - https://developers.google.com/places/web-service/search
  - Converts search text into formal address
  - Adds place photo from photo_reference

- Styled-components
  - Less files

## Concurrently

You can install concurrently package to run both server and client with one commend.

```json
{
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "client": "npm run start --prefix client",
    "server": "nodemon app.js",
    "dev": "concurrently --kill-others-on-fail \"npm run server\" \"npm run client\"",
    "start": "node app.js"
  }
}
```

`npm run dev` will start both the server and the client.

### Disadvantages of using concurrently

If you want to build your server api first then start building your frontend, any changes you save to the client application will cause the server to restart and reconnect to the database. Waiting for 2 more seconds every time you save the file will not be a pleasant dev experience.

## Proxy option

You can set `proxy` option in `package.json` to proxy requests from the client to the address of the server. This will redirect request to the specified address and you only need to provide api path without protocol, hostname, and port when making fetch request from client.

- [Proxying API Request in Development](https://create-react-app.dev/docs/proxying-api-requests-in-development/)
