'use server';

export async function createTenant(formData: FormData) {
  await fetch('/api/super/createTenant', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: formData.get('name') }),
  });
}

export async function createUser(formData: FormData) {
  await fetch('/api/super/createUser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: formData.get('email'),
      name: formData.get('name'),
      tenantId: formData.get('tenantId'),
    }),
  });
}
