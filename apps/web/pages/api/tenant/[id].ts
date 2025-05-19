import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const { id } = req.query;

  const { data: user } = await supabase
    .from("users")
    .select("tenantId")
    .eq("id", userId)
    .single();

  if (!user || user.tenantId !== id) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { data } = await supabase
    .from("tenants")
    .select("*")
    .eq("id", id)
    .single();

  res.status(200).json({ tenant: data });
}
