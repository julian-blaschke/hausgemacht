const { ApolloServer } = require("apollo-server-express");
const schema = require("./graphql/schema");
const express = require("express");
const mongoose = require("mongoose");
const { MLAB_URI } = require("./mongoose/config");

const app = express();
const server = new ApolloServer({
  schema,
  playground: true
});

server.applyMiddleware({ app });
app.listen(4001, () => {
  mongoose
    .connect(MLAB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(console.log("connected to hausgemacht-db"))
    .catch(console.error);
});

console.log("hausgemacht-graphql-api up and running on port 4000 👩‍🍳");
