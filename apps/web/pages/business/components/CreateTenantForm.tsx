"use client";
import { FormEvent, useState } from "react";
import { createTenant } from "../_actions";

export function CreateTenantForm() {
  const [name, setName] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", name);
    await createTenant(fd);
    setName("");
  }

  return (
    <form onSubmit={onSubmit} className="space-x-2">
      <input
        type="text"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
        placeholder="Tenant name"
        className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Create Tenant
      </button>
    </form>
  );
}
