import { gql } from "apollo-server-micro"

const typeDefs = gql`
  scalar Date
  type GroupedEntry {
    items: Int
    meanPrice: Float
    minPrice: Float
    maxPrice: Float
    meanM2: Float
    minM2: Float
    maxM2: Float
    meanPriceM2: Float
    minPriceM2: Float
    maxPriceM2: Float
    createdAt: Date
  }
  type Entry {
    id: ID
    medianPrice: Float
    meanPrice: Float
    minPrice: Float
    maxPrice: Float
    medianM2: Float
    meanM2: Float
    minM2: Float
    maxM2: Float
    medianPriceM2: Float
    meanPriceM2: Float
    minPriceM2: Float
    maxPriceM2: Float
    items: Int
    type: String
    location: String
    subLocation: String
    createdAt: Date
  }
  type Query {
    entry(id: String!): Entry
    entries(type: String, location: String, subLocation: String): [Entry]
    subLocations(location: String!, type: String): [String]
    groupedEntries(
      type: String
      location: String
      subLocation: String
    ): [GroupedEntry]
  }
`

export default typeDefs
