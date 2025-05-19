"use client";
import { FormEvent, useState } from "react";
import { createUser } from "../_actions";

export function CreateUserForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [tenantId, setTenantId] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("email", email);
    fd.append("name", name);
    fd.append("tenantId", tenantId);
    await createUser(fd);
    setEmail("");
    setName("");
    setTenantId("");
  }

  return (
    <form onSubmit={onSubmit} className="space-x-2">
      <input
        type="text"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        placeholder="Email"
        className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
        placeholder="Name"
        className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        value={tenantId}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTenantId(e.target.value)
        }
        placeholder="Tenant ID"
        className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add User
      </button>
    </form>
  );
}
