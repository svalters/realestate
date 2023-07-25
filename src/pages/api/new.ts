import { NextApiRequest, NextApiResponse } from "next";

import { start } from "@/api/scrape";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  start();
  res.status(200).json({ started: true });
}
