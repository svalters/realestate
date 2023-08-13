import { NextApiRequest, NextApiResponse } from "next";

import { start } from "@/api/scrape";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { secret } = req.query;

  const secretMatch = (process.env.SCRAPER_SECRET || undefined) === secret;
  if (secretMatch) {
    await start();
  }
  return res.status(200).json({ started: secretMatch });
}
