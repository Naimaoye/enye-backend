const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar Date

  type Location {
    id: String
    location: String
    searchType: String
    user: String
    lat: Float
    lng: Float
    distance: String
  }

  type Query {
    hello: String
    getHistory(id: String): [Location]
  }

  type Geometry {
    location: MainLocation
  }

  type MainLocation {
    lat: Float
    lng: Float
  }
  
`;