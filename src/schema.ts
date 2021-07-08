import { gql } from "@apollo/client"

export const TREND_SCHEMA = gql`
  query getTrendEntries(
    $type: String
    $location: String
    $subLocation: String
  ) {
    groupedEntries(
      type: $type
      location: $location
      subLocation: $subLocation
    ) {
      items
      meanPrice
      meanPriceM2
      createdAt
    }
  }
`

export const PROPERTIES_SCHEMA = gql`
  query getPropertyEntries($location: String!, $subLocation: String!) {
    entries(location: $location, subLocation: $subLocation) {
      items
      type
      createdAt
    }
  }
`

export const PRICE_SCHEMA = gql`
  query getPriceEntries(
    $type: String!
    $location: String!
    $subLocation: String!
  ) {
    entries(type: $type, location: $location, subLocation: $subLocation) {
      items
      medianPrice
      meanPrice
      minPrice
      maxPrice
      medianM2
      meanM2
      minM2
      maxM2
      medianPriceM2
      meanPriceM2
      minPriceM2
      maxPriceM2
      createdAt
    }
  }
`

export const SUB_LOCATION_SCHEMA = gql`
  query getSubLocations($location: String!, $type: String) {
    subLocations(location: $location, type: $type)
  }
`
