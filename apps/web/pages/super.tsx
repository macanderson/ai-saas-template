import { useState } from 'react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function SuperPage() {
  const [tenantName, setTenantName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userTenant, setUserTenant] = useState('');

  async function createTenant() {
    await fetch(`${API_URL}/tenants`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: tenantName }),
    });
    setTenantName('');
  }

  async function createUser() {
    await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail, name: userName, tenantId: userTenant }),
    });
    setUserEmail('');
    setUserName('');
    setUserTenant('');
  }

  return (
    <main>
      <h1>Super Admin</h1>
      <SignedIn>
        <section>
          <h2>Create Tenant</h2>
          <input value={tenantName} onChange={(e) => setTenantName(e.target.value)} placeholder="Tenant name" />
          <button onClick={createTenant}>Create</button>
        </section>
        <section>
          <h2>Create User</h2>
          <input value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder="Email" />
          <input value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Name" />
          <input value={userTenant} onChange={(e) => setUserTenant(e.target.value)} placeholder="Tenant ID" />
          <button onClick={createUser}>Create</button>
        </section>
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </main>
  );
}
