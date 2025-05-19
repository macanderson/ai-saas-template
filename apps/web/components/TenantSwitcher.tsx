'use client';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { supabase } from '../lib/supabase';
import { Input } from '@ui';

export function TenantSwitcher() {
  const { user } = useUser();
  const [tenants, setTenants] = useState<{id: string; name: string}[]>([]);
  const [current, setCurrent] = useState('');

  useEffect(() => {
    async function loadTenants() {
      if (user) {
        const res = await supabase
          .from('tenants')
          .select('id, name')
          .eq('id', user.publicMetadata.tenant_id as string);
        if (!res.error && res.data) {
          setTenants(res.data);
          setCurrent(res.data[0]?.id ?? '');
        }
      }
    }
    loadTenants();
  }, [user]);

  if (!user) return null;

  return (
    <select
      className="border rounded px-2 py-1"
      value={current}
      onChange={(e) => setCurrent(e.target.value)}
    >
      {tenants.map((t) => (
        <option key={t.id} value={t.id}>
          {t.name}
        </option>
      ))}
    </select>
  );
}
