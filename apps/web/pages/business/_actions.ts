'use server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function createTenant(formData: FormData) {
  await fetch(`${API_URL}/tenants`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: formData.get('name') }),
  });
}

export async function createUser(formData: FormData) {
  await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: formData.get('email'),
      name: formData.get('name'),
      tenantId: formData.get('tenantId'),
    }),
  });
}
