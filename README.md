# Hive BBS

## Members: Tray Chea, Harvey Lucas, Tim Ma, Stefanie Riehle

## Usage

This project is deployed on Heroku at [https://hivebbs.herokuapp.com/](https://hivebbs.herokuapp.com/)

The following routes are available:

```plaintext
Signup:
    - POST: https://hivebbs.herokuapp.com/api/signup

Signin:
    - POST: https://hivebbs.herokuapp.com/api/signup

Protected API:
    - POST: https://hivebbs.herokuapp.com/api/acl/:category/
    - PUT/DELETE: https://hivebbs.herokuapp.com/api/acl/:category/:id

Public API:
    - GET: https://hivebbs.herokuapp.com/api/readOnly
    - GET (by id): https://hivebbs.herokuapp.com/api/readOnly/:id

note: supported categories include arts-crafts, auto, clothing, electronics, entertainment, furniture, general, kids, houseHold, music
```

Notification clients can be executed using the following commands. Note that the demonstration clients are configured for the furniture and auto categories and should be run in seperate terminals.

```plaintext
terminal 1:
> node ./client/autoClient.js

terminal 2:
> node ./client/furnClient
```

## Installation

To run this appllication locally, clone the repository to your machine. The clients will need to be manually configured to access the localhost.

```plaintext
terminal 1:
> npm install
> npm start

terminal 2:
> node ./client/autoClient.js

terminal 3:
> node ./client/furnClient

```

## Problem Domain:

We want to create a bulletin board system that will allow a user to post an item for sale to a wide audience.

- **MVP:** System will allow a user to:
  - sign up
  - sign in
  - subscribe to a channel or topic to receive notifications
  - add an item for sale to a database that generates a message to subscribers
- **Stretch goal:** Create multiple channels on a variety of topics
- **Stretch goal:** Post a message to a message board
- **Stretch goal:** Send a direct message to another user

## Wireframe

![Hive BBS Wireframe](./docs/HIVEbbs.jpg)

## Dependencies

- base-64
- bcrypt
- cors
- dotenv
- express
- jest
- jsonwebtoken
- morgan
- pg
- sequelize
- sequelize-cli
- socket.io
- socket.io-client
- sqlite3
- supertest
