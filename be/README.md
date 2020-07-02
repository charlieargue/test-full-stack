# Overview: 
## Back-End Server (Node.js)

A **Node.js** backend using **GraphQL**, **Apollo-Server**, and **MongoDB** with basic CRUD functionality on a single Users collection, written for Superformula's interview test (requires a MongoDB Atlas account).

# How to install

```sh
# change directory into the back-end subdirectory
cd be

# install all libraries
npm i
```

# Quick Start

You will need to grab a `.env` environment variable file:
```
🛑 Both the front-end and the back-end will not work without the correct .env files!
```

```sh
# start the server locally
npm start
```

Open [http://localhost:4000](http://localhost:4000) to open the **GraphQL Playground** in the browser.

# Libraries Used

- `graphql`
- `apollo-server`
- `mongoose`

# GraphQL CRUD Queries and Mutations
```
🛑 WARNING: the e2e tests may break with your edits, they are brittle right now since there is no testing database and no new database spin-up and hydration just yet...
```

You can use these in the **GraphQL Playground**, but you can easily break the e2e tests:
```js

✅query {
  allUsers {
    id
    name
    description
    address,
    createdAt
  }
}

✅query {
  filteredUsers(search: null, page: 2) {
    id
    name
    description
    address
    createdAt
  }
}



🛑 mutation {
  createUser(name: "Jenna", address: "New Orleans") {
    id
    name
    address
    createdAt
    updatedAt
  }
}

🛑mutation {
  editUser(
    id: "1ffbf3dfef11830cdab5a42d"
    name: "Bella Bartok 2nd"
    address: "Poland ISBUENO",
    description: "hello world description"
  ) {
    id
    name
    address
    createdAt
    updatedAt
  }
}

🛑mutation {
  deleteUser(id: "5efbfa2cef11830cdab5a42f") {
    id
  }
}



```

# Test Mocked JSON Data 

I have some mocked test data that can be **inserted-in-bulk** into MongoDB via the Atlas website UI for inserting documents into collections (just wrap in an [array]), see `/json/mocked-users.json`

