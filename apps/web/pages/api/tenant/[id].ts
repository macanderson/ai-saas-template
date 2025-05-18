import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth, getAuth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export default requireAuth(async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = getAuth(req);
  const { id } = req.query;

  const { data: user } = await supabase
    .from('users')
    .select('tenantId')
    .eq('id', userId)
    .single();

  if (!user || user.tenantId !== id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { data } = await supabase
    .from('tenants')
    .select('*')
    .eq('id', id)
    .single();

  res.status(200).json({ tenant: data });
});
