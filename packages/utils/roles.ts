import { Roles } from "../types";
import { auth } from "@clerk/nextjs/server";

export const checkRole = async (role: Roles) => {
  const { sessionClaims } = await auth();
  const claims = sessionClaims as CustomJwtSessionClaims | undefined;
  return claims?.metadata.role === role;
};
