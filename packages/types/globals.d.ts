export {};

// Create a type for the roles
export type Roles = "recruiter" | "candidate" | "admin";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
