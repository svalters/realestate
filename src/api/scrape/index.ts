import mongoose from "mongoose";
import { flatten } from "lodash";

import { getCandidates, scrape, insertEntries } from "./scraper";
import connection from "../connection";

export const start = () =>
  connection
    .then(() => Promise.all(getCandidates()))
    .then((candidates) => Promise.all(scrape(candidates)))
    .then((entries) => flatten(entries))
    .then((entries) => Promise.all(insertEntries(entries)))
    .finally(() => mongoose.connection.close());
