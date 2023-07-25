import { GraphQLScalarType } from "graphql";

import Entry from "@/api/model";

interface EntriesProps {
  type?: string;
  location?: string;
  subLocation?: string;
}

interface SubLocationsProps {
  location: string;
  type?: string;
}

const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    serialize: (value) => value.getTime(),
  }),
  Query: {
    entry: (_: any, { id }: { id: string }) => Entry.findById(id),
    entries: (_: any, { type, location, subLocation }: EntriesProps) =>
      Entry.find({
        ...(type && { type }),
        ...(location && { location }),
        ...(subLocation && { subLocation }),
      }).sort({ createdAt: 1 }),
    subLocations: (_: any, { location, type }: SubLocationsProps) =>
      Entry.find({ location, ...(type && { type }) }, ["subLocation"]).distinct(
        "subLocation"
      ),
    groupedEntries: (_: any, { type, location, subLocation }: EntriesProps) => {
      const shouldMatch = type || location || subLocation;
      return Entry.aggregate([
        ...(shouldMatch
          ? [
              {
                $match: {
                  ...(type && { type }),
                  ...(location && { location }),
                  ...(subLocation && { subLocation }),
                },
              },
            ]
          : []),
        {
          $group: {
            _id: "$createdAt",
            createdAt: { $first: "$createdAt" },
            items: { $sum: "$items" },
            meanPrice: { $avg: "$medianPrice" },
            minPrice: { $min: "$minPrice" },
            maxPrice: { $max: "$maxPrice" },
            meanM2: { $avg: "$medianM2" },
            minM2: { $min: "$minM2" },
            maxM2: { $max: "$maxM2" },
            meanPriceM2: { $avg: "$medianPriceM2" },
            minPriceM2: { $min: "$minPriceM2" },
            maxPriceM2: { $max: "$maxPriceM2" },
          },
        },
        { $sort: { createdAt: 1 } },
      ]);
    },
  },
};

export default resolvers;
