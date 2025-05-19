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

export async function removeRole(formData: FormData) {
  const userId = formData.get('userId') as string;
  const role = formData.get('role') as string;
  await fetch(`${API_URL}/users/${userId}/roles/remove`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role }),
  });
}

export async function setRole(formData: FormData) {
  const userId = formData.get('userId') as string;
  const role = formData.get('role') as string;
  await fetch(`${API_URL}/users/${userId}/roles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role }),
  });
}