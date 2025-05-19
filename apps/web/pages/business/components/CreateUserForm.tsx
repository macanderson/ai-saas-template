'use client';
import { FormEvent, useState } from 'react';
import { createUser } from '../_actions';
import { Button, Input } from '@ui';

export function CreateUserForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [tenantId, setTenantId] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData();
    fd.append('email', email);
    fd.append('name', name);
    fd.append('tenantId', tenantId);
    await createUser(fd);
    setEmail('');
    setName('');
    setTenantId('');
  }

  return (
    <form onSubmit={onSubmit} className="space-x-2">
      <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <Input value={tenantId} onChange={(e) => setTenantId(e.target.value)} placeholder="Tenant ID" />
      <Button type="submit">Add User</Button>
    </form>
  );
}
