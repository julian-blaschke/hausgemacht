const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    recipes: [Recipe]!
  }

  type Recipe {
    _id: ID!
    title: String!
    description: String!
    type: String!
    duration: Int!
    diet: Diet!
    created: String!
    photoURL: String
    Ingredients: [Ingredient]!
  }

  type Ingredient {
    _id: ID!
    title: String!
    unit: Unit!
    amount: Int!
  }

  enum Unit {
    grams
    litres
    teaspoon
    tablespoon
    piece
  }

  enum Diet {
    vegan
    vegeterian
    pesceterian
    flexitarian
  }
`;
module.exports = typeDefs;
