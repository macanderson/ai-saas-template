"use server";

import { checkRole } from "@/../../lib/utils";
import { clerkClient } from "@clerk/nextjs/server";

export async function setRole(formData: FormData) {
  const client = await clerkClient();

  // Check that the user trying to set the role is an admin
  if (!checkRole("admin")) {
    console.log("Not Authorized");
    // return { message: "Not Authorized" };
  }

  try {
    const res = await client.users.updateUserMetadata(
      formData.get("id") as string,
      {
        publicMetadata: { role: formData.get("role") },
      }
    );
    console.log(res.publicMetadata);
    // return { message: res.publicMetadata };
  } catch (err) {
    // return { message: err };
    console.log(err);
  }
}

export async function removeRole(formData: FormData) {
  const client = await clerkClient();

  try {
    const res = await client.users.updateUserMetadata(
      formData.get("id") as string,
      {
        publicMetadata: { role: null },
      }
    );
    console.log(res.publicMetadata);
    // return { message: res.publicMetadata };
  } catch (err) {
    // return { message: err };
    console.log(err);
  }
}
