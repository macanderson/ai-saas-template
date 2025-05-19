import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const admin = await clerkClient.users.getUser(userId);
  const adminEmail = admin.emailAddresses[0]?.emailAddress;
  if (adminEmail !== process.env.SUPERUSER_EMAIL) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { email, name, tenantId } = req.body;
  const { data, error } = await supabase
    .from("users")
    .insert({ email, name, tenantId })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ user: data });
}
