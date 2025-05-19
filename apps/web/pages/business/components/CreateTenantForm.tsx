'use client';
import { FormEvent, useState } from 'react';
import { createTenant } from '../_actions';
import { Button, Input } from '@ui';

export function CreateTenantForm() {
  const [name, setName] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData();
    fd.append('name', name);
    await createTenant(fd);
    setName('');
  }

  return (
    <form onSubmit={onSubmit} className="space-x-2">
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tenant name" />
      <Button type="submit">Create Tenant</Button>
    </form>
  );
}
